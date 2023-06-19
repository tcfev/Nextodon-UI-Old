import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { GiPartyPopper } from "react-icons/gi";

type DoneContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
    icon: boolean
    title: string,
    subtitle: string
}

export default function DoneContent (props: DoneContentProperties) {
    return (
        <>
            <div className="card-body">
                <div className="row gap-2">
                    <h3 className="col mb-5 fw-bold">
                        {
                            props.icon
                            ?
                                <GiPartyPopper className="me-2 text-info" size={50}></GiPartyPopper>
                            :
                            ''
                        }
                        {props.title}
                    </h3>
                    <p>
                    {props.subtitle}
                    </p>
                </div>
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
                    >Go To App</button>
                </div>
            </div>
        </>
    );
}