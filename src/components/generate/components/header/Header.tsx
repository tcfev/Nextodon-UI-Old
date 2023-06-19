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
                        <img className="signup-head-icon-frame-image" src={require('./../../../../assets/media/firework.png')} alt="ForDem"></img>
                    </figure>
                    :
                    ''
                }
                <h2 className="mb-5">
                    {props.title}
                </h2>
            </div>
            <p className="signup-head-subtitle">
                {props.subtitle}
            </p>
        </div>
    );
}