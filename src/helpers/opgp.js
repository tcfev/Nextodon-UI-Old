import * as openpgp from './../../node_modules/openpgp/dist/openpgp.min.mjs';

export async function getKeyPair (phrase) {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa', 
        rsaBits: 4096,
        userIDs:[{name: 'Omid Malekzadeh', email: 'omidmalekzadeh@yahoo.com'}],
        passphrase: phrase
    });

    return {
        key: {
            private: privateKey,
            public: publicKey
        }
    };
}