import { useEffect, useState } from "react";
import { 
    logger, 
    get,
    generateRandomWordsInElement,
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
        const wallet = ethers.HDNodeWallet.createRandom("test password but not worked");
        const generatedPhrase = wallet.mnemonic ? wallet.mnemonic.phrase.split(' ') : [];
        
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
                    ethers.HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(wallet.mnemonic?.phrase, "test password but not worked")).privateKey
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