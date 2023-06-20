import { useEffect, useState } from "react";
import { 
    logger, 
    get,
    generateRandomWordsInElement,
    getRandomWords,
} from "../../../../helpers/functions";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectPhrase, setPhrase } from "../../../../store/features/phrase/phraseSlice";
import Loading from "../../../loading/Loading";
import PopUp from "../../../popup/PopUp";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BiRefresh } from "react-icons/bi";
import { ethers } from "ethers";

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
                <div className="row">
                    {
                        props.icon
                        ?
                        <figure className="signup-head-icon-frame">
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
                <div className="row d-flex gap-1 mb-2 py-2 px-0" id="phrase-generation"></div>
                <div className="row p-0">
                    <button 
                        className="btn btn-info text-light col-6 mx-auto" 
                        title="Regenarates the words"
                        onClick={() => {
                            setPopupIsHide(false);
                        }}
                    >
                        Regenerate <span><BiRefresh size={25}></BiRefresh></span>
                    </button>
                </div>
                <div className="row p-2 mt-4">
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