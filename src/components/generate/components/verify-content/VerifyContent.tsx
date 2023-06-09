import { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectPhrase } from "../../../../store/features/phrase/phraseSlice";
import { get, getEmptyArray, logger } from "../../../../helpers/functions";

type VerifyContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
    randomWords: string[]
}

export default function VerifyContent (props: VerifyContentProperties) {
    const generatedPhrase: any = useAppSelector(selectPhrase);
    const [emptyPhrase, setEmptyPhrase] = useState(getEmptyArray(props.randomWords.length));
    // const [passPhrase, setPassPhrase] = useState(null);

    const isSetEmptyPhrase = () : boolean => {
        return emptyPhrase.findIndex(e => e === null) === -1
    }

    const checkVerification = () : boolean => {
        logger("Checking Verification", generatedPhrase.phrase.value, emptyPhrase);
        let validated = true;
        const oldPhrase:string[] = generatedPhrase.phrase.value;
        
        if (generatedPhrase.phrase.value.length === emptyPhrase.length)
            for (let i = 0; i < oldPhrase.length; i++) {
                if (oldPhrase[i] !== emptyPhrase[i]) {
                    validated = false;
                }
            }
        if (validated) {
           /**
            * Go To Application now
            */
        }
        return validated;
    } 

    return (
       <div className="verify-content">
            <div className="verify-content-phrase-ordered-places">
                {
                    emptyPhrase.map((word: string, i: number) => {
                        return <div
                            key={i * 5}
                            onClick={(event: any) => {
                                if (emptyPhrase.findIndex(el => el === word) !== -1) {
                                    emptyPhrase[i] = null;
                                    const modifiedEmptyPhrase = [...emptyPhrase];
                                    setEmptyPhrase(modifiedEmptyPhrase);
                                    const checkWordElement =  get('div[content="PHRASE_'.concat(word, '"]'));
                                    if (checkWordElement !== null) {
                                        checkWordElement.classList.remove('selected');
                                    }
                                }
                            }}
                            className={word !== null ? 'notEmpty' : ''}
                        >
                            <span>{i + 1}</span>
                            <span>{word}</span>
                        </div>;
                    })
                }
            </div>
            <p>
                Choose them in specific order.
            </p>
            <div className="verify-content-phrase-unordered-places">
                {
                    props.randomWords.map((word: string, i: number) => {
                        return <div 
                            key={i * 5}
                            onClick={(event: any) => {
                                if (emptyPhrase.findIndex(el => el === word) === -1) {
                                    emptyPhrase[emptyPhrase.indexOf(null)] = word;
                                    const modifiedEmptyPhrase = [...emptyPhrase];
                                    setEmptyPhrase(modifiedEmptyPhrase);
                                    event.currentTarget.classList.add('selected');
                                }
                            }}
                            content={'PHRASE_'.concat(word)}
                        >
                            <span>?</span>
                            <span>{word}</span>
                        </div>;
                    })
                }
            </div>
            <div className="verify-content-control">
                {/* <p>Choose a strong password for your account (optional)</p>
                <input type="text" placeholder="password" onInput={(e: any) => setPassPhrase(e.target.value)}/> */}
                <div className="verify-content-control-btns">
                    <button 
                        className="verify-content-control-btns-back" 
                        title="Go Main Page" 
                        onClick={() => props.setNavState(props.navState - 1 === 0 ? 0 : props.navState - 1)}
                    ></button>
                    <button 
                        className="verify-content-control-btns-continue" 
                        type="submit" 
                        title="Continue"
                        disabled={!isSetEmptyPhrase()}
                        {...(isSetEmptyPhrase() && { onClick: () => {
                            if (checkVerification()) {
                                props.setNavState(props.navState + 1 === 3 ? 0 : props.navState + 1) ;
                            }
                        }})}
                    >Continue</button>
                </div>
            </div>
        </div>
    );
}