import { useEffect } from "react";

type LoadingProperties = {
    after: number,
    phraseCallback: () => void
}
export default function Loading (props: LoadingProperties) {
    let timeoutId: any = undefined;

    /**
     * Loading timeout
     * @param count 
     */
    const loading = (count: number = 0 ) => {
        if (count === props.after) {
            clearTimeout(timeoutId);
            props.phraseCallback();
        } else {
            timeoutId = setTimeout(loading, 1000, count + 1);
        }
    }
    
    useEffect(() => {
        loading();
    }, []);

    return (
        <div className="loading-spinner">
            <span></span>
        </div>
    );
}