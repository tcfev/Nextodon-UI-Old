import { useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { selectPhrase } from "../../../../store/features/phrase/phraseSlice";
import { get, getEmptyArray, logger, login } from "../../../../helpers/functions";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Header from "../header/Header";

type VerifyContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
    randomWords: string[],
    icon: boolean
    title: string,
    subtitle: string,
    passphrase: string
}

export default function VerifyContent (props: VerifyContentProperties) {
    const generatedPhrase: any = useAppSelector(selectPhrase);
    const [emptyPhrase, setEmptyPhrase] = useState(getEmptyArray(props.randomWords.length));

    /**
     * Check if phrase is empty
     * @returns boolean
     */
    const isSetEmptyPhrase = () : boolean => {
        return emptyPhrase.findIndex(e => e === null) === -1
    }

    /**
     * Checks verification between 
     * ordered and unordered mnemonics
     * @returns boolean
     */
    const checkVerification = () : boolean => {
        let validated = true;
        const oldPhrase:string[] = generatedPhrase.phrase.value;
        
        if (generatedPhrase.phrase.value.length === emptyPhrase.length)
            for (let i = 0; i < oldPhrase.length; i++) {
                if (oldPhrase[i] !== emptyPhrase[i]) {
                    validated = false;
                }
            }
        if (validated) {
            logger("Checking Verification", login(emptyPhrase.join(' '), props.passphrase));
        }
        return validated;
    } 

    return (
        <>
            <div className="card-body">
                <Header icon={props.icon} title={props.title} subtitle={props.subtitle} ></Header>
                <div className="row pt-0 px-0 gap-1">
                    {
                        emptyPhrase.map((word: string, i: number) => {
                            if (i % 4 === 0) {
                                return (
                                    <div className="col" key={i}>{
                                        emptyPhrase
                                        .filter((w: string, j: number) => j >= i && j < i + 4)
                                        .map((w: string, j: number) => {
                                            return (
                                                <div 
                                                    className="row gap-1 border rounded mb-2" 
                                                    key={i+j}
                                                    onClick={(event: any) => {
                                                        if (emptyPhrase.findIndex(el => el === w) !== -1) {
                                                            emptyPhrase[i+j] = null;
                                                            const modifiedEmptyPhrase = [...emptyPhrase];
                                                            setEmptyPhrase(modifiedEmptyPhrase);
                                                            const checkWordElement =  get('div[content="PHRASE_'.concat(w, '"]'));
                                                            if (checkWordElement !== null) {
                                                                checkWordElement.classList.remove('text-decoration-line-through', 'disabled');
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <span className="col-2 px-0 bg-light rounded-start text-center py-3 fs-6">{i+j+1}</span>
                                                    <span className="col px-0 py-2 d-flex flex-column justify-content-center">{w}</span>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                );
                            }
                            return '';
                        })
                    }
                </div>
                <p className="row pt-5 pb-0 px-3">
                    Choose them in specific order.
                </p>
                <div className="row pt-0 px-0 gap-1 mb-5">
                    {
                        props.randomWords.map((word: string, i: number) => {
                            if (i % 4 === 0) {
                                return (
                                    <div className="col" key={i}>
                                        {
                                            props.randomWords
                                            .filter((w: string, j: number) => j >= i && j < i + 4)
                                            .map((w: string, j: number) => {
                                                return (
                                                    <div 
                                                        className="row gap-1 border rounded mb-2" 
                                                        key={i+j}
                                                        onClick={(event: any) => {
                                                            if (emptyPhrase.findIndex(el => el === w) === -1) {
                                                                emptyPhrase[emptyPhrase.indexOf(null)] = w;
                                                                const modifiedEmptyPhrase = [...emptyPhrase];
                                                                setEmptyPhrase(modifiedEmptyPhrase);
                                                                event.currentTarget.classList.add('text-decoration-line-through', 'disabled');
                                                            }
                                                        }}
                                                        content={'PHRASE_'.concat(w)}
                                                    >
                                                        <span className="col-2 px-0 bg-light rounded-start text-center py-3 fs-6">?</span>
                                                        <span className="col px-0 py-2  d-flex flex-column justify-content-center">{w}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                );
                            }
                            return '';
                        })
                    }
                </div>
            </div>
            <div className="card-footer">
                {/* <p>Choose a strong password for your account (optional)</p>
                <input type="text" placeholder="password" onInput={(e: any) => setPassPhrase(e.target.value)}/> */}
                <div className="row gap-2 p-2">
                    <button 
                        className="col btn btn-secondary p-0" 
                        title="Go Main Page" 
                        onClick={() => props.setNavState(props.navState - 1 === 0 ? 0 : props.navState - 1)}
                    ><HiOutlineArrowNarrowLeft size={40}></HiOutlineArrowNarrowLeft></button>
                    <button 
                        className="col btn btn-primary" 
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
        </>
    );
}