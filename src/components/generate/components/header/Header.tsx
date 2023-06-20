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
                <h2 className="mb-5 fw-bold">
                    {props.title}
                </h2>
            </div>
            <p className="signup-head-subtitle">
                {props.subtitle}
            </p>
        </div>
    );
}