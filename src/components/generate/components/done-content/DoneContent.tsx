import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Header from "../header/Header";

type DoneContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
    icon: boolean
    title: string,
    subtitle: string,
    token: any
}

export default function DoneContent (props: DoneContentProperties) {
    return (
        <>
            <div className="card-body">
                <Header icon={props.icon} title={props.title} subtitle={props.subtitle} ></Header>
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
                        title="Go To App"
                        onClick={() => {
                            const query = new URLSearchParams(window.location.search);
                            const redirectUri = query.get("redirect_uri");
                            if (props.token) {
                                if (redirectUri) {
                                    window.location.href = redirectUri + "?code=" + props.token;
                                } else {
                                    window.location.href = "/";
                                }
                            }
                        }}
                    >Go To App</button>
                </div>
            </div>
        </>
    );
}