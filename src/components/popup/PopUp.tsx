
type PopUpProperties = {
    message: string,
    yesCallback: (value: boolean) => void,
    noCallback: (value: boolean) => void
}

export default function PopUp (props: PopUpProperties) {
    return (
        <div className="popup-box">
            <dialog className="border rounded p-5 shadow col m-auto" open>
                <p className="row">{props.message}</p>
                <form className="row" method="dialog">
                    <div className="row gap-1 m-auto">
                        <button className="col btn btn-danger" value="cancel" formMethod="dialog" onClick={() => props.noCallback(true)}>Cancel</button>
                        <button className="col btn btn-success" id="confirmBtn" value="default" onClick={() => {
                            props.noCallback(true)
                            props.yesCallback(false);
                        }}>Confirm</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}