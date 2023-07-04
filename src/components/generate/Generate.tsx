import { useEffect, useState } from "react";
import GenerateContent from "./components/generate-content/GenerateContent";

type SignUpProps = {
    goTo: (route:any) => void
}

export default function SignUp (props:SignUpProps) {
    const [navigationState, setNavigationState] = useState(0);

    const getContent = (state: number) => {
        switch(state) {
            case 0:
                return (
                    <GenerateContent 
                        navState={navigationState}
                        setNavState={setNavigationState}
                        goTo={props.goTo}
                        icon={false} 
                        title="Generate Mnemonic" 
                        subtitle="Your mnemonic is your digital identity. It is important to keep it secure. Write it down on paper and store it in a safe location to prevent loss."
                    ></GenerateContent>
                );
            default: break;
        }
    }

    useEffect(() => {}, []);

    return (
        <div className="card">
            {getContent(navigationState)}
        </div>
    );
}
