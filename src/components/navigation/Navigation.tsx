type NavigationProperties = {
    state: number
}
export default function Navigation (props: NavigationProperties) {
    const setClassDependOnState = (state: number) : string => {
        return state === props.state ? 'active' : '';
    }

    return (
        <div className="navigation">
            <span className={"navigation-link " + (setClassDependOnState(0))}></span>
            <span className={"navigation-link " + (setClassDependOnState(1))}></span>
            <span className={"navigation-link " + (setClassDependOnState(2))}></span>
        </div>
    );
}