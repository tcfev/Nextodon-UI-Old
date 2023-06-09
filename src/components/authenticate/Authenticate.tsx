import { useState } from "react";
import { get, isValidValue, logger, replaceErrorWithOk } from "../../helpers/functions";
import { Mnemonic, Wordlist, ethers } from "ethers";
import { WORDS } from "./words";

export default function SignIn () {
    const [phrase, setPhrase] = useState("");
    const [password, setPassword] = useState("");
    const [suggestionList, setSuggestionList] = useState<string[]>([]);
    const [searchVal, setSearchVal] = useState("");
    const [valStart, setValStart] = useState(0);
    const [valEnd, setValEnd] = useState(0);

    const suggestion = (value: string) => {
        setSearchVal(value);
        setSuggestionList([]);
        if (value.length >= 2)
            setSuggestionList(WORDS.filter(w => w.startsWith(value)));
    }

    const authenticate = async (mnemonicPhrase: string, password: string) => {
        logger('Authentication Started');

        /**
         * Fetch endpoint
         */
    }

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
             * Authenticate now
             */
            authenticate(phrase, password);

            logger('Form validation: OK');

        } else {
            logger('Form validation: FAILED');
        }
    }

    return (
        <div className="signin-component">
            <p className="signin-component-description">
                Enter your mnemonic phrase to import your Digital Identity
            </p>
            <form 
                method="post" 
                className="signin-component-form"
                onSubmit={getDigitalIdentity}
            >
                <div>
                    <span></span>
                    <div className="signin-component-form-suggestion">
                        {suggestionList && suggestionList.map((w, i) => 
                            <div 
                                key={i * 5}
                                onClick={(e: any) => {
                                    const phraseTextarea: any = get('.phrase-textarea');
                                    if (phraseTextarea !== null) {
                                        const beforeValue = phraseTextarea.value.substring(0, valStart);
                                        const afterValue = phraseTextarea.value.substring(valEnd);
                                        const appendedContent = beforeValue.concat(e.currentTarget.getAttribute('content'))
                                                                           .concat(afterValue);
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
                    <span></span>
                </div>
                <textarea 
                    name="phrase" 
                    placeholder="A mnemonic phrase could have 12, 15, 18, 21 or 24 words. Please Enter and separate them with space."
                    onInput={
                        (event: any) => {
                            const valueStart = event.target.value.lastIndexOf(' ', event.target.selectionStart - 1) + 1; //event.target.value.substring(event.target.value.lastIndexOf(' ', event.target.selectionStart - 1) + 1);
                            const valueEnd = valueStart + event.target.value.substring(valueStart).indexOf(' ');

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
                    className="phrase-textarea"
                    value={phrase}
                ></textarea>
                <input 
                    name="password" 
                    type="text" 
                    placeholder="Your password"
                    onInput={
                        (event: any) => {
                            if(isValidValue(event.target, event.target.value)){
                                setPassword(event.target.value);
                            } else {
                                setPassword("");
                            }
                        }
                    }
                />
                <button 
                    type="submit" 
                    className="btn"
                    disabled={(phrase.length === 0)}
                >Continue</button>
            </form>
        </div>
    );
}