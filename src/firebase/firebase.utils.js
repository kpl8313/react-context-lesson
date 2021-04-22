import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCfe2ewjrSYbNnc61i82KdtaYuhsEfEizI",
  authDomain: "crwn-clothing-db-6e9f6.firebaseapp.com",
  projectId: "crwn-clothing-db-6e9f6",
  storageBucket: "crwn-clothing-db-6e9f6.appspot.com",
  messagingSenderId: "758998831279",
  appId: "1:758998831279:web:ea2b48b38366420004445a",
  measurementId: "G-5KQ4WSQ2DC"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

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
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
