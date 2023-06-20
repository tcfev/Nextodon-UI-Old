import { ethers } from 'ethers';
import { Color } from './classes';
const DEBUG:boolean = true;

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
        const item: any = array[Math.floor(Math.random() * 12)];
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

        let column = create("div");

        words.forEach((word: string, index: number) => {
          
            const wordFrame: HTMLElement = create('div');
            wordFrame.className = 'row gap-2 border rounded mb-1';
            
            const wordNumber: HTMLElement = create('span');
            wordNumber.textContent = String(index + 1);
            wordNumber.style.backgroundColor = Color.getRandom();
            wordNumber.className = 'col-2 px-0 rounded-start text-center py-3 fs-6';
            
            const wordEelement: HTMLElement = create('span');
            wordEelement.textContent = word;
            wordEelement.className = 'col px-0 py-2 d-flex flex-column justify-content-center';
            
            wordFrame.appendChild(wordNumber);
            wordFrame.appendChild(wordEelement);
        

            if (index % 4 !== 0) {
                console.log(index);
                column.appendChild(wordFrame);

            } else if (index % 4 === 0) {
                console.log(index);
                column = create("div");
                column.className = 'col';
                column.appendChild(wordFrame);

                wordBox.appendChild(column);
            }
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


export function getRandomWords () : any[] {
    const allWords = getWords();
    const newArray: any[] = [];
    let securityCounter = 0;
    while (newArray.length < 12) {
        const item: any = allWords[Math.floor(Math.random() * allWords.length)];
        if (newArray.findIndex((el) => el === item) === -1)
            newArray.push(item)

        if (securityCounter++ > 500)
        break;
    }
    return newArray;
}

//------------------- from old login -------------------------
function hexToBytes(hex: string): number[] {
    let bytes = [];
    for (let c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function postData(url: string, data: any): Promise<Response> {
    const response = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response;
}

export function getWords(): string[] {
    const en = ethers.wordlists['en'] as ethers.WordlistOwl;
    return en._decodeWords();
}

export async function login(mnemonic: string, passPhrase: string): Promise<string | null> {
    logger('Login: ', mnemonic.trim(), passPhrase);

    const mnemonicObject = ethers.Mnemonic.fromPhrase(mnemonic.trim(), passPhrase);
    const node = ethers.HDNodeWallet.fromMnemonic(mnemonicObject);
    const wallet = node.derivePath("m/44'/60'/0'/0/0");
    const digest = ethers.sha256(wallet.publicKey);
    const signingKey = new ethers.SigningKey(wallet.privateKey);
    const signature = signingKey.sign(digest);
    const r = hexToBytes(signature.r.substring(2));
    const s = hexToBytes(signature.s.substring(2));

    const signatureBytes = [0x30, 0x44, 0x02, 0x20];
    signatureBytes.push(...r);
    signatureBytes.push(...[0x02, 0x20]);
    signatureBytes.push(...s);

    const publicKeyBytes = hexToBytes(wallet.publicKey.substring(2));

    const sig = Uint8Array.from(signatureBytes);
    const pub = Uint8Array.from(publicKeyBytes);

    const signature64 = ethers.encodeBase64(sig);
    const publicKey64 = ethers.encodeBase64(pub);

    const response = await postData("/api/v1/authentication/signin", {
        signature: signature64,
        publicKey: publicKey64,
    });
    logger('Login: ', {
        signature: signature64,
        publicKey: publicKey64,
    })
    const result = await response.json();

    return result.value;
}

export function generateMnemonic(this: any): string[] {
    return ethers.Mnemonic.fromEntropy(ethers.randomBytes(16), this).phrase.split(' ');
}
//--------------------------------------------------