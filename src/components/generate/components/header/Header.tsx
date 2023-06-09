type HeaderProperties = {
    icon: boolean
    title: string,
    subtitle: string
}
export default function Header (props: HeaderProperties) {
    return (
        <div className="signup-head">
            <div className="signup-head-icon">
                {
                    props.icon
                    ?
                    <figure className="signup-head-icon-frame">
                        <img className="signup-head-icon-frame-image" src={require('./../../../../assets/media/firework.png')} alt="ForDem"></img>
                    </figure>
                    :
                    ''
                }
                <h2 className="signup-head-title">
                    {props.title}
                </h2>
            </div>
            <p className="signup-head-subtitle">
                {props.subtitle}
            </p>
        </div>
    );
}