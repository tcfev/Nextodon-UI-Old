import { useEffect, useState } from "react";
import { 
    logger, 
    get,
    generateRandomWordsInElement,
    hexToBytes,
    login,
} from "../../../../helpers/functions";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectPhrase, setPhrase } from "../../../../store/features/phrase/phraseSlice";
import { HDNodeWallet, Mnemonic, ethers } from "ethers";
import Loading from "../../../loading/Loading";
import PopUp from "../../../popup/PopUp";

type GenerateContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
}

export default function GenerateContent (props: GenerateContentProperties) {
    const [isWritten, setWritten] = useState<null | boolean>(null);
    const WORD_LENGTH = 12; 
    const dispatch = useAppDispatch();
    const generatedPhrase = useAppSelector(selectPhrase);
    let words: string[] | undefined = generatedPhrase.phrase.value;
    const [isLoaded, setIsLoaded] = useState(false);
    const [popupIsHide, setPopupIsHide] = useState(true);


    /**
     * Handles form submit 
     * @param event 
     */
    const handleFormSubmit = (event: any) => {
        event.preventDefault();

        if (event.target.elements.agreement !== undefined &&
            event.target.elements.agreement.checked && 
            words !== undefined && 
            words.length === WORD_LENGTH) {
            get('label[for="agreement-checkbox"]')?.classList.remove('error');
            logger('Form validation: OK');
            props.setNavState(props.navState + 1 === 3 ? 0 : props.navState + 1);
            
            /*
                create wallet + private/public-key
                and go to next step
            */
        } else {
            if (!event.target.elements.agreement.checked) {
                get('label[for="agreement-checkbox"]')?.classList.add('error');
            }
            logger('Form validation: FAILED');
        }
    }


    /**
     * Handles click on regenrate button
     * to generate new phrase
     */
    const generatePhrase = async () => {
        const wallet = ethers.HDNodeWallet.createRandom("testPassword");
        const generatedPhrase = wallet.mnemonic ? wallet.mnemonic.phrase.split(' ') : [];
        
        /**
         * Not given passphrase
         */
        // publicKey: "0x02c5c6c454e05a7d14b69f2158847de04325bea08ddaaa860a1ee34824459d012c"
        // publicKey: "0x037daea1636614c0d40e8b1337e3d045cb7c14ba2fe83a77677c65cdab1980d2dd"
        
        // privateKey: "0x650bba5ac53821c0aa086b1e0fbb97e117363e9cbe59de7643fcb6e800d89bfd"
        // privateKey: "0x93a070fc1aca56fcb85fb2feb0d6c66208d3f7a825fe026f2ca224c74e7f184d"

        /**
         * With correct phasphrase
         */
        // publicKey: "0x02f4fe786f899c35ad1a5b11be6058cd70c530e8f3185ab8a7f5a932ef39aec74d"
        // publicKey: "0x02f4fe786f899c35ad1a5b11be6058cd70c530e8f3185ab8a7f5a932ef39aec74d"
        
        // privateKey: "0x4c19677486a98aaad12d6767bc254ee29145a5477e44f73d085221c9ca2f72a8"
        // privateKey: "0x4c19677486a98aaad12d6767bc254ee29145a5477e44f73d085221c9ca2f72a8"

    
        if (generatedPhrase.length === 12) {
            const obj = {
                address: wallet.address,
                privateKey: wallet.privateKey,
                publicKey: wallet.publicKey,
                phrase: wallet.mnemonic?.phrase
            };
            logger(obj);

            if (wallet.mnemonic)
                logger(
                    wallet.privateKey,
                    HDNodeWallet.fromPhrase(wallet.mnemonic?.phrase, "testPassword").privateKey
                );

            if (words !== undefined)
                dispatch(setPhrase(generatedPhrase));

            if (get('#phrase-generation') !== null) {
                generateRandomWordsInElement(get('#phrase-generation'), generatedPhrase);
                setIsLoaded(true);
            }
        }
    }
    
    useEffect(() => {}, []);

    return (
        <div className="signup-content">
            {
                popupIsHide
                ? ''
                : <PopUp message="Do you want to regenerate?" yesCallback={setIsLoaded} noCallback={setPopupIsHide}></PopUp>
            }
            <div className="signup-content-phrase">
                {
                    !isLoaded
                    ? <Loading after={1} phraseCallback={generatePhrase}></Loading>
                    : ''
                }
                <div className="signup-content-phrase-generation" id="phrase-generation">
                    
                </div>
                <div className="signup-content-phrase-tool">
                    <button 
                        className="signup-content-phrase-tool-regenerate-btn" 
                        title="Regenarates the words"
                        onClick={() => {
                            setPopupIsHide(false);
                        }}
                    >
                        <span className="signup-content-phrase-tool-regenerate-btn-text">Regenerate</span>
                        <figure className="signup-content-phrase-tool-regenerate-btn-icon">
                            <img className="signup-content-phrase-tool-regenerate-btn-icon-image" src={require('./../../../../assets/media/refresh.png')} alt="Refresh"></img>
                        </figure>
                    </button>
                </div>
            </div>
            <div className="signup-content-control">
                <form method="post" onSubmit={handleFormSubmit}>
                    <div className="signup-content-control-inputs">
                        <input 
                            className="signup-content-control-inputs-checkbox" 
                            type="checkbox" 
                            id="agreement-checkbox" 
                            name="agreement" 
                            onClick={(e) => setWritten(!isWritten)}
                        />
                        <label htmlFor="agreement-checkbox" className={"signup-control-inputs-label"}>I have written down the mnemonic phrase.</label>
                    </div>
                    <div className="signup-content-control-btns">
                        <Link 
                            className="signup-content-control-btns-back" 
                            title="Go Main Page" 
                            to="/"
                        ></Link>
                        <button 
                            className="signup-content-control-btns-continue" 
                            type="submit" 
                            title="Continue"
                            disabled={(
                                words === undefined || (words !== undefined && words.length !== WORD_LENGTH) || !isWritten
                            )}
                        >Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}