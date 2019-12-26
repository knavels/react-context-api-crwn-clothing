import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD1BpiemCfF3UAQq-uKbwgweLpOpxMk4HM",
  authDomain: "crwn-db-27f49.firebaseapp.com",
  databaseURL: "https://crwn-db-27f49.firebaseio.com",
  projectId: "crwn-db-27f49",
  storageBucket: "crwn-db-27f49.appspot.com",
  messagingSenderId: "880380744687",
  appId: "1:880380744687:web:9ef31bbd8794c8a7225c1a",
  measurementId: "G-4F84D2HE5S",
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
