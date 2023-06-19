import { useState } from "react";
import { get, isValidValue, logger, replaceErrorWithOk } from "../../helpers/functions";
import { WORDS } from "./words";

type SignInProps = {
    goBack: () => void
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
        if (value.length >= 2)
            setSuggestionList(WORDS.filter(w => w.startsWith(value)));
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
         * Fetch endpoint
         * Check authentication
         * 
         * 
         * 
         * 
         */
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

        if (event.target.elements.phrase.value.length > 0 && 
            event.target.elements.password.value.length > 0) {

            /**
             * call authenticate now
             */
            authenticate(phrase, password);

            logger('Form validation: OK');

        } else {
            logger('Form validation: FAILED');
        }
    }

    return (
        <div className="card">
            <div className="card-header">

            </div>

            <div className="card-body">
                <h3 className="mb-5">Sign in to your account</h3>
                <p className="row px-3">
                    Enter your mnemonic phrase to import your Digital Identity
                </p>
                <form 
                    method="post" 
                    className="row gap-2 px-3"
                    onSubmit={getDigitalIdentity}
                >
                    <div className="col d-flex position-relative">
                        <span className="glassy-left"></span>
                        <div className="col-12 d-flex gap-2 overflow-y-scroll px-5 pb-3">
                            {suggestionList && suggestionList.map((w, i) => 
                                <div 
                                    className="border rounded py-0 px-2 border-info text-info"
                                    key={i * 5}
                                    onClick={(e: any) => {
                                        const phraseTextarea: any = get('.phrase-textarea');
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
                        className=""
                        rows={6}
                        value={phrase}
                        autoComplete="off"
                    ></textarea>
                    <input 
                        name="password" 
                        type="text" 
                        placeholder="Your password (optional)"
                        onInput={
                            (event: any) => {
                                if(isValidValue(event.target, event.target.value)){
                                    setPassword(event.target.value);
                                } else {
                                    setPassword("");
                                }
                            }
                        }
                        autoComplete="off"
                    />
                </form>
            </div>

            <div className="card-footer">
                <div className="row gap-2 p-2">
                    <button 
                        type="reset" 
                        className="col btn btn-secondary"
                        onClick={() => props.goBack()}
                        // disabled={!isMnemonicComplete(phrase)}
                    >Back</button>
                    <button 
                        type="submit" 
                        className="col btn btn-primary"
                        // disabled={!isMnemonicComplete(phrase)}
                    >Sign in</button>
                </div>
            </div>
        </div>
    );
}