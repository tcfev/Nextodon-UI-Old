
type PopUpProperties = {
    message: string,
    yesCallback: (value: boolean) => void,
    noCallback: (value: boolean) => void
}

export default function PopUp (props: PopUpProperties) {
    return (
        <div className="popup-box">
            <dialog open>
                <p>{props.message}</p>
                <form method="dialog">
                    <div>
                        <button value="cancel" formMethod="dialog" onClick={() => props.noCallback(true)}>Cancel</button>
                        <button id="confirmBtn" value="default" onClick={() => {
                            props.noCallback(true)
                            props.yesCallback(false);
                        }}>Confirm</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}