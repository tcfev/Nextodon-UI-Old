import { useState } from "react";
import { isValidValue, logger, replaceErrorWithOk } from "../../helpers/functions";
import { Mnemonic, Wordlist, ethers } from "ethers";
import { WORDS } from "./words";

export default function SignIn () {
    const [phrase, setPhrase] = useState("");
    const [password, setPassword] = useState("");
    const [suggestionList, setSuggestionList] = useState<string[]>([]);
    const [searchVal, setSearchVal] = useState("");

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
                                    const appendedContent = phrase.substring(0, phrase.lastIndexOf(' '))
                                                            .concat((phrase.split(' ').length > 1 ? ' ' : ''))
                                                            .concat(e.currentTarget.getAttribute('content'))
                                                            .concat(' ');
                                    setPhrase(appendedContent);
                                    suggestion('');
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
                            if(isValidValue(event.target, event.target.value)){
                                setPhrase(event.target.value);
                            } else {
                                setPhrase("");
                            }
                            suggestion(event.target.value.substring(event.target.value.lastIndexOf(' ') + 1).toLowerCase());
                        }
                    }
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