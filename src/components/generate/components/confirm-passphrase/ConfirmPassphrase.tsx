import { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

type ConfirmPassphraseProperties = {
    navState: number,
    setNavState: (value:number) => void,
    passPhrase: string,
    setConfirmPassphrase: (value:string) => void,
    icon: boolean
    title: string,
    subtitle: string
}

export default function ConfirmPassphrase (props: ConfirmPassphraseProperties) {
    const [confirmPhrase, setConfirmPhrase] = useState("");
    const isMatch = () => {
        if (props.passPhrase.length === confirmPhrase.length) 
            return props.passPhrase.match(confirmPhrase) 
        return false;
    }

    return (
        <>
            <div className="card-body">
                <div className="row">
                    {
                        props.icon
                        ?
                        <figure className="signup-head-icon-frame">
                        </figure>
                        :
                        ''
                    }
                    <h3 className="mb-5 fw-bold">
                        {props.title}
                    </h3>
                    <p>
                    {props.subtitle}
                    </p>
                </div>
                <form>
                    <input 
                        type="password" 
                        className="p-2 col-12 mb-3"
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
            <div className="card-footer">
                <div className="row gap-2 p-2">
                    <button 
                        className="col btn btn-secondary p-0" 
                        title="Go Main Page" 
                        onClick={() => props.setNavState(props.navState - 1)}
                    ><HiOutlineArrowNarrowLeft size={40}></HiOutlineArrowNarrowLeft></button>
                    <button 
                        className="col btn btn-primary" 
                        type="submit" 
                        title="Continue"
                        {...(isMatch()  && { 
                            onClick: () => props.setNavState(props.navState + 1)
                        })}
                    >Continue</button>
                </div>
            </div>
        </>
    );
}