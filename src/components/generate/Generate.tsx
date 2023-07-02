import Navigation from "../navigation/Navigation";
import { 
    randomize,
} from "../../helpers/functions";
import { useEffect, useState } from "react";
import GenerateContent from "./components/generate-content/GenerateContent";
import VerifyContent from "./components/verify-content/VerifyContent";
import DoneContent from "./components/done-content/DoneContent";
import { selectPhrase } from "../../store/features/phrase/phraseSlice";
import { useAppSelector } from "../../store/hooks";
import ChoosePassphrase from "./components/choose-passphrase/ChoosePassphrase";
import ConfirmPassphrase from "./components/confirm-passphrase/ConfirmPassphrase";

type SignUpProps = {
    goTo: (route:any) => void
}

export default function SignUp (props:SignUpProps) {
    const [navigationState, setNavigationState] = useState(0);
    const generatedPhrase = useAppSelector(selectPhrase);
    const NAVIGATION_STEP_COUNT = 5;
    const [passPhrase, setPassphrase] = useState("");
    const [confirmPassphrase, setConfirmPassphrase] = useState("");
    const [token, setToken] = useState<any>();

    const getContent = (state: number) => {
        switch(state) {
            case 0:
                return (       
                    <ChoosePassphrase 
                        navState={navigationState}
                        setNavState={setNavigationState}
                        setPassphrase={setPassphrase}
                        goTo={props.goTo}
                        icon={false} 
                        title="Choose Passphrase" 
                        subtitle="Please choose a strong passphrase for your account."
                    ></ChoosePassphrase>
                );
            case 1:
                return (
                    <ConfirmPassphrase 
                        navState={navigationState}
                        setNavState={setNavigationState}
                        passPhrase={passPhrase}
                        setConfirmPassphrase={setConfirmPassphrase}
                        goTo={props.goTo}
                        icon={false} 
                        title="Confirm Passphrase" 
                        subtitle="Confirm your passphrase, if you choosed one."
                    ></ConfirmPassphrase>
                );
            case 2:
                return (
                    <GenerateContent 
                        navState={navigationState}
                        setNavState={setNavigationState}
                        passphrase={confirmPassphrase}
                        goTo={props.goTo}
                        icon={false} 
                        title="Generate Token" 
                        subtitle="Your mnemonic is your digital identity. It is important to keep it secure. Write it down on paper and store it in a safe location to prevent loss."
                    ></GenerateContent>
                );
            case 3: 
                return (        
                    <VerifyContent
                        navState={navigationState}
                        setNavState={setNavigationState}
                        randomWords={randomize(generatedPhrase.phrase.value)}
                        passphrase={confirmPassphrase}
                        goTo={props.goTo}
                        icon={false} 
                        title="Verify Your Mnemonic" 
                        subtitle="Arrange your mnemonic in the correct order."
                        setToken={setToken}
                    ></VerifyContent>
                );
            case 4: 
                return (
                    <DoneContent
                        navState={navigationState}
                        setNavState={setNavigationState}
                        icon={true}
                        title="Done!"
                        token={token}
                        subtitle="Congratulations! Your digital identity is now secure. Your can now use your account and enjoy the freedom of speech. Please remember to keep your identity safe."
                    ></DoneContent>
                );
            default: break;
        }
    }

    useEffect(() => {}, []);

    return (
        <div className="card">
            <div className="card-header p-3">
                <Navigation state={navigationState} steps={NAVIGATION_STEP_COUNT}></Navigation>
            </div>
            {getContent(navigationState)}
        </div>
    );
}
