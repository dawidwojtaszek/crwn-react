import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC49Q7VdOXrOq7BWduNGUidtUcDSIhYWsY",
    authDomain: "crwn-2-192ec.firebaseapp.com",
    projectId: "crwn-2-192ec",
    storageBucket: "crwn-2-192ec.appspot.com",
    messagingSenderId: "1005660321887",
    appId: "1:1005660321887:web:b17f7d888a60cf5fc2c3ea",
    measurementId: "G-HH2YT9MF4L"
};

firebase.initializeApp(config);



export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;
    const userRef = firestore.doc(`user/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log('error', error.message);
        }
    }
    return userRef;

}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;