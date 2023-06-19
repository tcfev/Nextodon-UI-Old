import Navigation from "../navigation/Navigation";
import { 
    randomize,
} from "../../helpers/functions";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import GenerateContent from "./components/generate-content/GenerateContent";
import VerifyContent from "./components/verify-content/VerifyContent";
import DoneContent from "./components/done-content/DoneContent";
import { selectPhrase } from "../../store/features/phrase/phraseSlice";
import { useAppSelector } from "../../store/hooks";
import ChoosePassphrase from "./components/choose-passphrase/ChoosePassphrase";
import ConfirmPassphrase from "./components/confirm-passphrase/ConfirmPassphrase";

type SignUpProps = {
    goBack: () => void
}

export default function SignUp (props:SignUpProps) {
    const [navigationState, setNavigationState] = useState(0);
    const generatedPhrase = useAppSelector(selectPhrase);
    const NAVIGATION_STEP_COUNT = 5;
    const [passPhrase, setPassphrase] = useState("");
    const [confirmPassphrase, setConfirmPassphrase] = useState("");

    const getContent = (state: number) => {
        switch(state) {
            case 0:
                return (
                    <div>            
                        <Header icon={false} title="Choose Passphrase" subtitle="Please choose a strong passphrase for your account."></Header>
                        <ChoosePassphrase 
                            navState={navigationState}
                            setNavState={setNavigationState}
                            setPassphrase={setPassphrase}
                            goBack={props.goBack}
                        ></ChoosePassphrase>
                    </div>
                );
            case 1:
                return (
                    <div>            
                        <Header icon={false} title="Confirm Passphrase" subtitle="Confirm your passphrase, if you choosed one."></Header>
                        <ConfirmPassphrase 
                            navState={navigationState}
                            setNavState={setNavigationState}
                            passPhrase={passPhrase}
                            setConfirmPassphrase={setConfirmPassphrase}
                        ></ConfirmPassphrase>
                    </div>
                );
            case 2:
                return (
                    <div>            
                        <Header icon={false} title="Generate Token" subtitle="Your mnemonic is your digital identity. It is important to keep it secure. Write it down on paper and store it in a safe location to prevent loss."></Header>
                        <GenerateContent 
                            navState={navigationState}
                            setNavState={setNavigationState}
                            passphrase={confirmPassphrase}
                        ></GenerateContent>
                    </div>
                );
            case 3: 
                return (
                    <div>            
                        <Header icon={false} title="Verify Your Mnemonic" subtitle="Arrange your mnemonic in the correct order."></Header>
                        <VerifyContent
                          navState={navigationState}
                          setNavState={setNavigationState}
                          randomWords={randomize(generatedPhrase.phrase.value)}
                        ></VerifyContent>
                    </div>
                );
            case 4: 
                return (
                    <div>            
                        <Header icon={true} title="Done!" subtitle="Congratulations! Your digital identity is now secure. Your can now use your account and enjoy the freedom of speech. Please remember to keep your identity safe."></Header>
                        <DoneContent
                            navState={navigationState}
                            setNavState={setNavigationState}
                        ></DoneContent>
                    </div>
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