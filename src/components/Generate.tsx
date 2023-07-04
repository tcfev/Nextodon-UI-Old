import { ethers } from "ethers";
import PopUp from "./popup/PopUp";
import Loading from "./loading/Loading";
import { BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectPhrase, setPhrase } from "../store/features/phrase/phraseSlice";
import { generateRandomWordsInElement, get, logger, login } from "../helpers/functions";

type SignUpProps = {
    goTo: (route:any) => void
}

export default function SignUp (props:SignUpProps) {
    const [isWritten, setWritten] = useState<null | boolean>(null);
    const WORD_LENGTH = 12; 
    const dispatch = useAppDispatch();
    const generatedPhrase = useAppSelector(selectPhrase);
    let words: string[] | undefined = generatedPhrase.phrase.value;
    const [isLoaded, setIsLoaded] = useState(false);
    const [popupIsHide, setPopupIsHide] = useState(true);
    const [passPhrase, setPassphrase] = useState("");

    useEffect(() => {}, []);

     /**
     * Handles form submit 
     * @param event 
     */
     const handleFormSubmit = async (event: any) => {
        event.preventDefault();

        if (event.target.elements.agreement !== undefined &&
            event.target.elements.agreement.checked && 
            words !== undefined && 
            words.length === WORD_LENGTH) {
            get('label[for="agreement-checkbox"]')?.classList.remove('error');

            try {
                /**
                 * Check authentication
                 */
                const token = await login(words.join(' '), passPhrase);
                const query = new URLSearchParams(window.location.search);
                const redirectUri = query.get("redirect_uri");

                if (token) {
                    if (redirectUri) {
                        window.location.href = redirectUri + "?code=" + token;
                    } else {
                        window.location.href = "/";
                    }
                }
            } catch (error) {
                logger("Invalid mnemonic");
            }
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

    return (
        <div className="card">
            {
                popupIsHide
                ? ''
                : <PopUp message="Do you want to regenerate?" yesCallback={setIsLoaded} noCallback={setPopupIsHide}></PopUp>
            }
            <div className="card-body">
                {
                    !isLoaded
                    ? <Loading after={1} phraseCallback={() => {generatePhrase(passPhrase);}}></Loading>
                    : ''
                }
                <div className="row">
                    <div className="col">
                        <h3 className="mb-3 py-2">
                            Generate Mnemonic
                        </h3>
                    </div>
                    <p className="mb-4 text-justify">
                        Your mnemonic is your digital identity. It is important to keep it secure. Write it down on paper and store it in a safe location to prevent loss.
                    </p>
                </div>
                
                <div className="row d-flex gap-1 mb-2 py-2 px-2" id="phrase-generation"></div>
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
                        <div className="row my-3">
                            <label htmlFor="passphrase" className="p-0 mb-2">
                            Passphrase (optional)
                            </label>
                            <input 
                                id="passphrase" 
                                className="p-2" 
                                type="password" 
                                placeholder="Enter your passphrase (or leave blank)"
                                onInput={(e:any)=>setPassphrase(e.target.value)}
                            />
                        </div>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="agreement-checkbox" 
                                name="agreement" 
                                onClick={(e) => setWritten(!isWritten)}
                            />
                            <label htmlFor="agreement-checkbox" className="form-check-label">I have written the phrase on paper!</label>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card-footer">
                <div className="row gap-2 p-2">
                    <button 
                        className="col-3 btn btn-secondary p-0" 
                        title="Go Main Page" 
                        onClick={() => props.goTo('SIGNIN')}
                    ><HiOutlineArrowNarrowLeft size={40}></HiOutlineArrowNarrowLeft></button>
                    <button 
                        className="col btn btn-primary" 
                        type="submit" 
                        title="Continue"
                        form="written-form"
                        disabled={(
                            words === undefined || (words !== undefined && words.length !== WORD_LENGTH) || !isWritten
                        )}
                    >Enter Fordem</button>
                </div>
            </div>
        </div>
    );
}
