type NavigationProperties = {
    state: number,
    steps: number
}
export default function Navigation (props: NavigationProperties) {
    const setClassDependOnState = (state: number) : string => {
        return state === props.state ? 'active' : '';
    }

    return (
        <div className="navigation">
            {
                Array.from(Array(props.steps).keys()).map(i => 
                    <span key={i * 5} className={"navigation-link " + (setClassDependOnState(i))}></span>
                )
            }
        </div>
    );
}