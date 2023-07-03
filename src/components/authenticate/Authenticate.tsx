import { useState } from "react";
import { get, getWords, isValidValue, logger, login, replaceErrorWithOk } from "../../helpers/functions";
import { ethers } from "ethers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPhrase } from "../../store/features/phrase/phraseSlice";

type SignInProps = {
    goTo: (route:any) => void
}

export default function SignIn (props: SignInProps) {
    const [phrase, setPhrase] = useState("");
    const [password, setPassword] = useState("");
    const [suggestionList, setSuggestionList] = useState<string[]>([]);
    const [searchVal, setSearchVal] = useState("");
    const [valStart, setValStart] = useState(0);
    const [valEnd, setValEnd] = useState(0);

    /**
     * Makes suggestion list top of mnemonic input element
     * on authenticate page
     * @param value 
     */
    const suggestion = (value: string) => {
        setSearchVal(value);
        setSuggestionList([]);
        if (value.length > 0)
            setSuggestionList(getWords().filter(w => w.startsWith(value.toLowerCase())));
    }

    /**
     * Checks if mnemonic phrase includes 12 words
     * @param value 
     * @returns boolan
     */
    const isMnemonicComplete = (value: string) : boolean => {
        return value.trim().split(' ').length === 12;
    }

    /**
     * Check publicKey validate
     * not yet completed
     * @param mnemonicPhrase 
     * @param password 
     */
    const authenticate = async (mnemonicPhrase: string, password: string) => {
        logger('Authentication Started');

        /**
         * Check authentication
         */
        const token = await login(mnemonicPhrase, password);
        const query = new URLSearchParams(window.location.search);
        const redirectUri = query.get("redirect_uri");

        if (token) {
            if (redirectUri) {
                window.location.href = redirectUri + "?code=" + token;
            } else {
                window.location.href = "/";
            }
        }
    }


    /**
     * Handles form on submit from continue button
     * on authenticate page
     * @param event 
     */
    const getDigitalIdentity = (event: any) => {
        event.preventDefault();
        console.log("aa")

        if (isValidValue(event.target.elements.phrase, event.target.elements.phrase.value)) {
            replaceErrorWithOk (event.target.elements.phrase);
        }
        if (isValidValue(event.target.elements.password, event.target.elements.password.value)) {
            replaceErrorWithOk (event.target.elements.password);
        }

        if (event.target.elements.phrase.value.length > 0 || 
            (
                event.target.elements.phrase.value.length > 0 && 
                event.target.elements.password.value.length > 0
            )
        ) {

            /**
             * call authenticate now
             */
            authenticate(phrase, password);

            logger('Form validation: OK');

        } else {
            logger('Form validation: FAILED');
        }
    }


    /**
     * Handles click on regenrate button
     * to generate new phrase
     */
    const generatePhrase = async () => {
        const generatedPhrase = ethers.HDNodeWallet.createRandom().mnemonic?.phrase.split(' ');

        if (generatedPhrase !== undefined)
            if (generatedPhrase.length === 12) {
                setPhrase(generatedPhrase.join(' '));
            }
    }

    return (
        <div className="card">
            <div className="card-header">

            </div>

            <div className="card-body">
                <h3 className="mb-5 fw-bold">Sign in to your account</h3>
                <p className="row px-3">
                    Enter your mnemonic words or 
                    <button 
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => generatePhrase()}
                    >
                        Generate
                    </button>
                    new ones
                </p>
                <form 
                    method="post" 
                    id="signin-form"
                    className="row gap-2 p-0 m-0"
                    onSubmit={getDigitalIdentity}
                    autoComplete="off"
                >
                    <div className="col position-relative p-0 m-0">
                        <span className="glassy-left"></span>
                        <div className="d-flex w-auto overflow-y-auto gap-2 pb-3 px-5 mx-3">
                            {suggestionList && suggestionList.map((w, i) => 
                                <div 
                                    className="border rounded py-0 px-2 border-info text-info"
                                    key={i * 5}
                                    onClick={(e: any) => {
                                        const phraseTextarea: any = get('#phrase-textarea');
                                        if (phraseTextarea !== null) {
                                            const beforeValue = phraseTextarea.value.substring(0, valStart);
                                            const afterValue = phraseTextarea.value.substring(valEnd);
                                            const appendedContent = beforeValue.concat(e.currentTarget.getAttribute('content'))
                                                                            .concat(afterValue.length === 0 ? afterValue.concat(' ') : afterValue);
                                    
                                            setPhrase(appendedContent);
                                            suggestion('');
                                
                                            phraseTextarea.focus();
                                        }
                                    }}
                                    content={w}
                                >
                                    <span>{searchVal}</span>
                                    <span>{w.substring(searchVal.length)}</span>    
                                </div>
                            )}
                        </div>
                        <span className="glassy-right"></span>
                    </div>
                    <textarea 
                        name="phrase" 
                        placeholder="A mnemonic phrase could have 12, 15, 18, 21 or 24 words. Please Enter and separate them with space."
                        onInput={
                            (event: any) => {
                                const valueStart = event.target.value.lastIndexOf(' ', event.target.selectionStart - 1) + 1; //event.target.value.substring(event.target.value.lastIndexOf(' ', event.target.selectionStart - 1) + 1);
                                const indexOfSpaceAfterStart = event.target.value.substring(valueStart).indexOf(' ');
                                const valueEnd = valueStart + (indexOfSpaceAfterStart !== -1 ? indexOfSpaceAfterStart : event.target.value.substring(valueStart).length);

                                setValStart(valueStart);
                                setValEnd(valueEnd);

                                if(isValidValue(event.target, event.target.value)){
                                    setPhrase(event.target.value);
                                } else {
                                    setPhrase("");
                                }
                                suggestion(event.target.value.substring(valueStart, valueEnd));
                            }
                        }
                        id="phrase-textarea"
                        className="p-2"
                        rows={6}
                        value={phrase}
                        autoComplete="off"
                    ></textarea>
                    <input 
                        className="p-2"
                        name="password" 
                        type="password" 
                        placeholder="Your password"
                        onInput={
                            (event: any) => {
                                setPassword(event.target.value);
                            }
                        }
                        autoComplete="off"
                    />
                </form>
            </div>

            <div className="card-footer">
                <div className="row gap-2 p-2">
                    {/* <button 
                        type="reset" 
                        className="col btn btn-secondary p-0"
                        onClick={() => props.goBack()}
                    ><HiOutlineArrowNarrowLeft size={40}></HiOutlineArrowNarrowLeft></button> */}
                    <button 
                        type="submit" 
                        className="col btn btn-primary"
                        form="signin-form"
                        disabled={!isMnemonicComplete(phrase)}
                    >Sign in / Sign up</button>
                </div>
                {/* <p className="mt-3">
                    Don't have an account yet? 
                    <span
                        className="p-2 text-decoration-underline text-primary"
                        onClick={() => props.goTo('SIGNUP')}
                    >
                        Sign up
                    </span >
                </p> */}
            </div>
        </div>
    );
}

/**
boss drama south mouse sure fluid churn normal reveal police join ribbon
 */