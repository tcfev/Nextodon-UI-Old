import { useState } from "react";

type ConfirmPassphraseProperties = {
    navState: number,
    setNavState: (value:number) => void,
    passPhrase: string,
    setConfirmPassphrase: (value:string) => void,
}

export default function ConfirmPassphrase (props: ConfirmPassphraseProperties) {
    const [confirmPhrase, setConfirmPhrase] = useState("");
    const isMatch = () => {
        if (props.passPhrase.length === confirmPhrase.length) 
            return props.passPhrase.match(confirmPhrase) 
        return false;
    }

    return (
        <div className="confirm-passphrase-content">
            <div className="confirm-passphrase-content-phrase">
                <form>
                    <input 
                        type="password" 
                        name="confirm-passphrase" 
                        placeholder="Confirm passphrase or leave empty"
                        onInput={(e:any) => {
                            props.setConfirmPassphrase(e.target.value);
                            setConfirmPhrase(e.target.value);
                            console.log(e.target.value.match(confirmPhrase));
                        }}
                        autoComplete="off"
                    />
                </form>
            </div>
            <div className="confirm-passphrase-content-control">
                <div className="confirm-passphrase-content-control-btns">
                    <button 
                        className="confirm-passphrase-content-control-btns-back" 
                        title="Go Main Page" 
                        onClick={() => props.setNavState(props.navState - 1)}
                    ></button>
                    <button 
                        className="confirm-passphrase-content-control-btns-continue" 
                        type="submit" 
                        title="Continue"
                        {...(isMatch()  && { 
                            onClick: () => props.setNavState(props.navState + 1)
                        })}
                    >Continue</button>
                </div>
            </div>
        </div>
    );
}