
type PopUpProperties = {
    message: string,
    yesCallback: (value: boolean) => void,
    noCallback: (value: boolean) => void
}

export default function PopUp (props: PopUpProperties) {
    return (
        <div className="popup-box">
            <dialog className="border-secondary rounded p-5 col m-auto" open>
                <p className="row mb-5">{props.message}</p>
                <form className="row" method="dialog">
                    <div className="row gap-4 m-auto">
                        <button className="col px-2 btn btn-outline-secondary" value="cancel" formMethod="dialog" onClick={() => props.noCallback(true)}>Cancel</button>
                        <button className="col px-2 btn btn-primary text-" id="confirmBtn" value="default" onClick={() => {
                            props.noCallback(true)
                            props.yesCallback(false);
                        }}>Confirm</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}