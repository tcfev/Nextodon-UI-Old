import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Header from "../header/Header";

type ChoosePassphraseProperties = {
    navState: number,
    setNavState: (value:number) => void,
    setPassphrase: (value:string) => void,
    goBack: () => void,
    icon: boolean
    title: string,
    subtitle: string
}

export default function ChoosePassphrase (props: ChoosePassphraseProperties) {
    return (
        <>
            <div className="card-body">
                <Header icon={props.icon} title={props.title} subtitle={props.subtitle} ></Header>
                <div className="row">
                    <form className="col" autoComplete="off">
                        <input 
                            className="p-2 col-12 mb-3"
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
                        className="col btn btn-secondary p-0" 
                        title="Go Main Page" 
                        onClick={() => props.goBack()}
                    ><HiOutlineArrowNarrowLeft size={40}></HiOutlineArrowNarrowLeft></button>
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