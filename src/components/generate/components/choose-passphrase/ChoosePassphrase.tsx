import { useState } from "react";
import { Link } from "react-router-dom";

type ChoosePassphraseProperties = {
    navState: number,
    setNavState: (value:number) => void,
    setPassphrase: (value:string) => void,
    goBack: () => void
}

export default function ChoosePassphrase (props: ChoosePassphraseProperties) {
    return (
        <>
            <div className="card-body">
                <div className="row">
                    <form className="col">
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
            </div>
            <div className="card-footer">
                <div className="row gap-2 p-2">
                    <button 
                        className="col btn btn-secondary" 
                        title="Go Main Page" 
                        onClick={() => props.goBack()}
                    ></button>
                    <button 
                        className="col btn btn-primary" 
                        type="submit" 
                        title="Continue"
                        disabled={false}
                        onClick={() => props.setNavState(props.navState + 1)}
                    >Continue</button>
                </div>
            </div>
        </>
    );
}