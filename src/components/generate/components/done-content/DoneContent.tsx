type DoneContentProperties = {
    navState: number,
    setNavState: (value:number) => void,
}

export default function DoneContent (props: DoneContentProperties) {
    return (
        <div className="done-content">

            <div className="done-content-control">
                <div className="done-content-control-btns">
                    <button 
                        className="done-content-control-btns-continue" 
                        title="Go To App"
                    >Go To App</button>
                </div>
            </div>
        </div>
    );
}