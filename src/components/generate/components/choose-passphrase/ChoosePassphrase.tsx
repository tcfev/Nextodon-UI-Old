import { useState } from "react";
import { Link } from "react-router-dom";

type ChoosePassphraseProperties = {
    navState: number,
    setNavState: (value:number) => void,
    setPassphrase: (value:string) => void,
}

export default function ChoosePassphrase (props: ChoosePassphraseProperties) {
    return (
        <div className="choose-passphrase-content">
            <div className="choose-passphrase-content-phrase">
                <form>
                    <input 
                        type="password" 
                        name="choose-passphrase" 
                        placeholder="Choose passphrase or leave empty"
                        onInput={(e:any) => {
                            props.setPassphrase(e.target.value);
                        }}
                        autoComplete="off"
                    />
                </form>
            </div>
            <div className="choose-passphrase-content-control">
                <div className="choose-passphrase-content-control-btns">
                    <Link 
                        className="choose-passphrase-content-control-btns-back" 
                        title="Go Main Page" 
                        to="/"
                    ></Link>
                    <button 
                        className="choose-passphrase-content-control-btns-continue" 
                        type="submit" 
                        title="Continue"
                        disabled={false}
                        onClick={() => props.setNavState(props.navState + 1)}
                    >Continue</button>
                </div>
            </div>
        </div>
    );
}