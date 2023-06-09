import { useEffect, useState } from "react";

type LoadingProperties = {
    after: number,
    phraseCallback: () => void
}
export default function Loading (props: LoadingProperties) {
    let timeoutId: any = undefined;
    const [counter, setCounter] =  useState(0);
    const loading = (count: number = 0 ) => {
        if (count === props.after) {
            clearTimeout(timeoutId);
            setCounter(0);
            props.phraseCallback();
        } else {
            setCounter(count + 1);
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