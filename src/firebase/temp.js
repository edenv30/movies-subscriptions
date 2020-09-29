import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCN1VJ-36hCrlmFmMxyTrB7pXn1QubKLf0",
  authDomain: "movies-subscriptions.firebaseapp.com",
  databaseURL: "https://movies-subscriptions.firebaseio.com",
  projectId: "movies-subscriptions",
  storageBucket: "movies-subscriptions.appspot.com",
  messagingSenderId: "261996716763",
  appId: "1:261996716763:web:84505c38bea3ebad8d62fe",
  measurementId: "G-BR8W9C4BC3"
};

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  
  export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

  export const createUserProfileDocument = async (userAuth, additionalData) =>  {
    if(!userAuth) return;

    console.log(firestore.doc(`users/123fdfds`));
  }


  export const generateUserDocument = async (userAuth, additionalData) => {
    console.log(userAuth, additionalData);
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log('userRef' ,userRef);
    
    // const collectionRef = firestore.collection('users');

    // const collectionSnapshot = await collectionRef.get();
    // console.log({ collection: collectionSnapshot.docs.map( doc => doc.data() ) });

    const snapshot = await userRef.get();
    console.log('snapShot', snapshot.data());
    if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {   // create a new document inside db
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(userAuth.uid);
  };
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  export default firebase;

  
 // take the user from the auth library and store inside the firestore
// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if(!userAuth) return; // !userAuth == null the user not exist

//   console.log(firestore.doc(`users/128gfgfgfg`));
// }

  // export const signInWithGoogle = () => auth.signInWithPopup(provider);


// provider.setCustomParameters({ prompt: 'select_account' });
  // export const signInWithGoogle = auth.signInWithPopup(provider).then(result => {
  //   return
  //   // console.log(result.user)
  // });


