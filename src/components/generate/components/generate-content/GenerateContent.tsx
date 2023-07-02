import { useEffect, useState } from "react";
import { 
    logger, 
    get,
    generateRandomWordsInElement,
} from "../../../../helpers/functions";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectPhrase, setPhrase } from "../../../../store/features/phrase/phraseSlice";
import Loading from "../../../loading/Loading";
import PopUp from "../../../popup/PopUp";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BiRefresh } from "react-icons/bi";
import { ethers } from "ethers";
import Header from "../header/Header";

type GenerateContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
    goTo: (route:any) => void,
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
        const generatedPhrase = ethers.HDNodeWallet.createRandom(passphrase).mnemonic?.phrase.split(' ');

        if (generatedPhrase !== undefined)
            if (generatedPhrase.length === 12) {
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
                <Header icon={props.icon} title={props.title} subtitle={props.subtitle} ></Header>
                <div className="row d-flex gap-1 mb-2 py-2 px-0" id="phrase-generation"></div>
                <div className="row p-0">
                    <button 
                        className="btn btn-primary text-light col-6 mx-auto" 
                        title="Regenarates the words"
                        onClick={() => {
                            setPopupIsHide(false);
                        }}
                    >
                        Regenerate <span><BiRefresh size={25}></BiRefresh></span>
                    </button>
                </div>
                <div className="row p-2 mt-4">
                    <form method="post" onSubmit={handleFormSubmit} id="written-form" autoComplete="off">
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
                <p className="mt-3">
                    Already have an account? 
                    <span
                        className="p-2 text-decoration-underline text-primary"
                        onClick={() => props.goTo('SIGNIN')}
                    >
                        Sign in
                    </span >
                </p>
            </div>
        </>
    );
}