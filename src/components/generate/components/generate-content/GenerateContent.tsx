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
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BiRefresh } from "react-icons/bi";

type GenerateContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
    passphrase: string,
    icon: boolean
    title: string,
    subtitle: string
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
            props.setNavState(props.navState + 1 === 5 ? 0 : props.navState + 1);
            
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
    const generatePhrase = async (passphrase:string) => {
        const wallet = ethers.HDNodeWallet.createRandom(passphrase);
        const generatedPhrase = wallet.mnemonic ? wallet.mnemonic.phrase.split(' ') : [];
        
        console.log(wallet.signMessage(passphrase));
        //0x27469ab23e971ac6753918c078545fc375d1bedc4bf8dfe3d15c75870c3868650e10c2f7c78f064884a9003ca007d499fc9b7839558adaeaf94b95c5ea0aa6be1b
        

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

        /*
            Public Key:
            Random String Signed:
        */
    
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
                    HDNodeWallet.fromPhrase(wallet.mnemonic?.phrase, passphrase).privateKey
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
        <>
            {
                popupIsHide
                ? ''
                : <PopUp message="Do you want to regenerate?" yesCallback={setIsLoaded} noCallback={setPopupIsHide}></PopUp>
            }
            <div className="card-body">
                {
                    !isLoaded
                    ? <Loading after={1} phraseCallback={() => {generatePhrase(props.passphrase);}}></Loading>
                    : ''
                }
                <div className="row">
                    {
                        props.icon
                        ?
                        <figure className="signup-head-icon-frame">
                            <img className="signup-head-icon-frame-image" src={require('./../../../../assets/media/firework.png')} alt="ForDem"></img>
                        </figure>
                        :
                        ''
                    }
                    <h3 className="mb-5 fw-bold">
                        {props.title}
                    </h3>
                    <p>
                    {props.subtitle}
                    </p>
                </div>
                <div className="row d-flex gap-1 mb-5 p-2" id="phrase-generation">
                    
                </div>
                <div className="row">
                    <button 
                        className="btn btn-info text-light col-4 m-auto" 
                        title="Regenarates the words"
                        onClick={() => {
                            setPopupIsHide(false);
                        }}
                    >
                        Regenerate <span><BiRefresh size={25}></BiRefresh></span>
                    </button>
                </div>
                <div className="row p-2 mt-5">
                    <form method="post" onSubmit={handleFormSubmit} id="written-form">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="agreement-checkbox" 
                                name="agreement" 
                                onClick={(e) => setWritten(!isWritten)}
                            />
                            <label htmlFor="agreement-checkbox" className="form-check-label">I have written down the mnemonic phrase.</label>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card-footer">
                <div className="row gap-2 p-2">
                    <button 
                        className="col btn btn-secondary p-0" 
                        title="Go Main Page" 
                        onClick={() => props.setNavState(props.navState - 1)}
                    ><HiOutlineArrowNarrowLeft size={40}></HiOutlineArrowNarrowLeft></button>
                    <button 
                        className="col btn btn-primary" 
                        type="submit" 
                        title="Continue"
                        form="written-form"
                        disabled={(
                            words === undefined || (words !== undefined && words.length !== WORD_LENGTH) || !isWritten
                        )}
                    >Continue</button>
                </div>
            </div>
        </>
    );
}