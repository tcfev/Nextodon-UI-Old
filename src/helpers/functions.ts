import { Color } from './classes';
const DEBUG:boolean = false;

/**
 * Checks if is the value on given target after form submit
 * valid: have length more than 0 and sets class error or ok
 * @param isSubmit 
 * @param target 
 * @param value 
 * @returns boolean
 */
export const isValidValue = (target:any, value: string) => {
    if (value.length > 0) {
        target.classList.remove('error');
        target.classList.add('ok');
        return true;
    } else {
        target.classList.remove('ok');
        target.classList.add('error');
        return false;
    }
}

/**
 * Replaces the error with ok as class for target element
 * @param element 
 */
export const replaceErrorWithOk = (element: any) => {
    if (element.value.length > 0) {
        element.classList.remove('error');
        element.classList.add('ok');
    }
}

/**
 * Prints the given value in the browser console
 * @param  {...any} value 
 */
export function print(...value: any) {
    console.log(value);
}

/**
 * Prints the given message with local datetime string in the browser console
 * @param  {...any} message 
 */
export function logger (...message: any) {
    if (DEBUG)
        console.log(`${new Date().toLocaleString()}: {`, message, `}`);
};


/**
 * Creates new HTMLElement and returns it
 * @param {*} tagName 
 * @returns HTMLElement
 */
export function create (tagName: string) {
    return document.createElement(tagName);
};

/**
 * Returns selected element from DOM
 * @param {*} selector 
 * @returns HTMLElement or NULL
 */
export function get (selector: string) {
    return document.querySelector(selector);
};

/**
 * Returns selected elements as a NodeList from DOM
 * @param {*} selector 
 * @returns NodeList
 */
export function getAll (selector: string) {
    return document.querySelectorAll(selector);
};

/**
 * Sets event listeners for the given event name depend on
 * given element objects, that includes HTMLElement and callback function
 * @param {*} eventName 
 * @param {*} elementObjects 
 */
export function setListeners (eventName: string, elementObjects:any[]) {
    if (elementObjects != null && elementObjects !== undefined && elementObjects.length > 0) {
        elementObjects.forEach((elementObject) => {
            if (elementObject.target !== undefined && elementObject.callback !== undefined) {
                elementObject.target.addEventListener(eventName, elementObject.callback);
            }
        });
    }
};

export function getEmptyArray (length: number) : any[] {
    const temp: any[] = new Array(length);
    return temp.fill(null, 0, length);
}

export function randomize (array: any[]) : any[] {
    const newArray: any[] = [];
    let securityCounter = 0;
    while (newArray.length !== array.length) {
        const item: any = array[Math.ceil(Math.random() * 12) - 1];
        if (newArray.findIndex((el) => el === item) === -1)
            newArray.push(item)

        if (securityCounter++ > 500)
        break;
    }
    return newArray;
}

/**
 * Generates Element depend on return value from the 
 * defined API Call and append this elements to given parent element
 * @param {*} wordBox 
 * @param {*} words 
 * @returns Generated Words as an array
 */
export function generateRandomWordsInElement (wordBox: any, words: string[]) {
    if (wordBox !== null && wordBox !== undefined) {
        wordBox.innerText = '';
        words.forEach((word: string, index: number) => {
            const wordFrame: HTMLElement = create('div');
            const wordNumber: HTMLElement = create('span');
            const wordEelement: HTMLElement = create('span');
            wordNumber.textContent = String(index + 1);
            wordNumber.style.backgroundColor = Color.getRandom();
            wordEelement.textContent = word;
            wordFrame.appendChild(wordNumber);
            wordFrame.appendChild(wordEelement);
            wordBox.appendChild(wordFrame);
        });
        logger('PhraseBox regenerated');
    }
}

/**
 * Adds numbers to the given items in array
 * and returns a new array
 * @param {*} words 
 * @returns modified array
 */
export function getNumericOrderedWords(words: string[]) {
    const orderedWords:string[] = [];
    words.forEach((word, index) => {
        orderedWords.push(`${index + 1}. ${word}\n`);
    });
    return orderedWords;
}

