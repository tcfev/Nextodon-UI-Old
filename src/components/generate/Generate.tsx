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



export default function SignUp () {
    const [navigationState, setNavigationState] = useState(0);
    const generatedPhrase = useAppSelector(selectPhrase);

    const getContent = (state: number) => {
        switch(state) {
            case 0:
                return (
                    <div>            
                        <Header icon={false} title="Generate Token" subtitle="Your mnemonic is your digital identity. It is important to keep it secure. Write it down on paper and store it in a safe location to prevent loss."></Header>
                        <GenerateContent 
                            navState={navigationState}
                            setNavState={setNavigationState}
                        ></GenerateContent>
                    </div>
                );
            case 1: 
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
            case 2: 
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
        <div className="signup">
            <Navigation state={navigationState}></Navigation>
            <div>
                {getContent(navigationState)}
            </div>
        </div>
    );
}