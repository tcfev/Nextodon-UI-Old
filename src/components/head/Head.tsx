export default function Head () {
    return (
        <div className="head">
            <div className="head-row-1">
                <figure className="head-row-1-col-1">
                    <img className="head-row-1-col-1-logo" src={require('./../../assets/media/mastodon.png')} alt="ForDem"></img>
                </figure>
                <h1 className="head-row-1-col-2">
                    Nextodon
                </h1>
            </div>
            <div className="head-row-2">
                <h3 className="head-row-2-col-1-subtitle">
                    Let's Start Democracy Today
                </h3>
            </div>
        </div>
    );
}