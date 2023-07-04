import { GiPartyPopper } from "react-icons/gi";

type HeaderProperties = {
    icon: boolean
    title: string,
    subtitle: string
}
export default function Header (props: HeaderProperties) {
    return (
        <div className="row">
            <div className="col">
                {
                    props.icon
                    ?
                    <figure className="signup-head-icon-frame">
                        <GiPartyPopper className="me-2 text-info" size={50}></GiPartyPopper>
                    </figure>
                    :
                    ''
                }
                <h3 className="mb-3 p-2">
                    {props.title}
                </h3>
            </div>
            <p className="signup-head-subtitle mb-4">
                {props.subtitle}
            </p>
        </div>
    );
}