import { useState } from "react";
import { get, getWords, isValidValue, logger, login, replaceErrorWithOk } from "../helpers/functions";

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
    const [errorMessage, setErrorMessage] = useState("");

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

        try {
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
        } catch (error) {
            setErrorMessage("Invalid mnemonic");
            setPhrase('');
        }
    }


    /**
     * Handles form on submit from continue button
     * on authenticate page
     * @param event 
     */
    const getDigitalIdentity = (event: any) => {
        event.preventDefault();

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
            authenticate(phrase, password);
        } else {
            logger('Form validation: FAILED');
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="mb-5 py-2">Sign in to your account</h3>
                <p className="row px-3">
                    Enter your mnemonic phrase, or 
                    <button 
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => props.goTo('SIGNUP')}
                    >
                        Generate
                    </button>
                    one.
                </p>
                <form 
                    method="post" 
                    id="signin-form"
                    className="row gap-2 p-0 m-0"
                    onSubmit={getDigitalIdentity}
                    autoComplete="off"
                >
                    <div className="col position-relative p-0 m-0">
                        <div className="d-flex w-auto overflow-y-auto gap-2 px-5 mx-3 my-2" style={{'height' : '50px'}}>
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
                    </div>
                    <span className="text-danger">{errorMessage}</span>
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
                                setErrorMessage('');

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
                        placeholder="Enter your passphrase (or leave blank)"
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
                    <button 
                        type="submit" 
                        className="col btn btn-primary"
                        form="signin-form"
                        disabled={!isMnemonicComplete(phrase)}
                    >Enter Fordem</button>
                </div>
            </div>
        </div>
    );
}

/**
boss drama south mouse sure fluid churn normal reveal police join ribbon
 */