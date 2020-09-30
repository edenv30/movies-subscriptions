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

  const permissionsDetails = {
    viewSubscriptions: true,
    createSubscriptions: false,
    updateSubscriptions: false,
    deleteSubscriptions: false,
    viewMovies: true,
    createMovies: false,
    updateMovies: false,
    deleteMovies: false
  }

  export const addCollectionToDocument = async (collectionKey, uid, objectToAdd) => {
    try {
      const collectionRef = firestore.collection(collectionKey);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      const newDocRef = collectionRef.doc(uid); // firebase render an id for the collection
      batch.set(newDocRef, objectToAdd);
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

   // function that take the user object authentication and store inside our database
  // async function, because we make an api request
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; // if the user signin - if user Auth not exist / userAuth == null -> false -> !false
    
    // if the user Auth exist, we go in firestore an query
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()
    //if userAuth doesn't exist, we create a one using the document object reference (not the snapshot, snapshot for the data)
    if(!snapShot.exists) {  // if user not exist we create him
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      addCollectionToDocument('permissions', userAuth.uid, permissionsDetails);
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
        // add collection permissions to user
      } catch(err) {
          console.log('error creating user', err.message);
      }
    }
    return userRef;

  } 

  export const addNewUser = async(collecionName, objToAdd) => {
    try {
      const collectionRef = firestore.collection(collecionName);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      const newDocRef = collectionRef.doc(); // firebase render an id for the collection
      if(collecionName === 'users')
        objToAdd.id=newDocRef.id;
      if(collecionName === 'usersLogin')
        addCollectionToDocument('permissions', newDocRef.id, permissionsDetails);
      batch.set(newDocRef, objToAdd);
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

   //for usersLogin
  export const getCollectionListSnapshotToMapUsersLogin = (collection) => {

    const transformedCollections = collection.docs.map( doc => {
      const { userName, signup } = doc.data();

      return {
        id: doc.id,
        userName,
        signup
      }
    } );
    return transformedCollections;
  }

  // Listening to Authentication Provider
  // This will keep a connection to the firebase authentication provider, 
  // and change whenever the backend state of the logged in user changes.
  // export const onAuthStateChangeFirebase = (callback) => {
  //   return auth.onAuthStateChanged( user => {
  //     console.log(user)
  //     if(user) {
  //       callback(true); // set loggedIn to true
  //       console.log('The user is logged in')
  //     }
  //     else {
  //       callback(false);
  //       console.log("The user is not logged in");
  //     }
  //   });
  // }

  export const onAuthStateChangeFirebase = (callback, callbackDetails) => {
    return auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        callback(true); // set loggedIn to true
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapShot => {
          callbackDetails({ 
            id: snapShot.id,
            ...snapShot.data()
          })
        } );
        console.log('The user is logged in');
      }
      else {
        callback(false);
        callbackDetails(userAuth);
        console.log("The user is not logged in");
      }
    });
  }

  // for usersLogin update signup when the user signup 
  export const updateUsersLogin = async (collectionKey, id) => {
    try {
      const userRef = firestore.collection(collectionKey).doc(id);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      batch.update(userRef, {signup: true});
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

  export const signup = async (userName, displayName, email, password) => {
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, {userName, displayName});
      return true;
    }
    catch(err) {
      console.error(err);
    }
    return false;
  }

  export const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password);
  }

  export const logout = () => {
    auth.signOut();
  }

  // adding data one time 
  export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    try {
      const collectionRef = firestore.collection(collectionKey);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc(); // firebase render an id for the collection
        batch.set(newDocRef, obj);
      });
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

  //add one item to db
  export const addDocumentToCollection = async (collectionKey, objectToAdd) => {
    try {
      const collectionRef = firestore.collection(collectionKey);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      const newDocRef = collectionRef.doc(); // firebase render an id for the collection
      batch.set(newDocRef, objectToAdd);
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

  //for movies
  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map( doc => {
      const { name, genres, image, premiered } = doc.data();

      return {
        routeName: encodeURI(name.toLowerCase()),
        id: doc.id,
        name, 
        genres, 
        image, 
        premiered
      }
    } );
    return transformedCollections;

    // return transformedCollections.reduce((accumulator, collection) => {
    //   // accumulator[collection.name.toLowerCase()] = collection;
    //   accumulator['movies'] = collection;
    //   console.log(accumulator)
    //   return accumulator;
    // }, {})
  } 

  //for users 
  export const getCollectionListSnapshotToMap = (collection) => {

    const transformedCollections = collection.docs.map( doc => {
      const { displayName, email, createdAt } = doc.data();

      return {
        id: doc.id,
        displayName, 
        email, 
        createdAt
      }
    } );
    return transformedCollections;
  }

  // for users permissions
  export const getCollectionListusersPermissionsSnapShotToMap = (collection) => {
    const transformedCollections = collection.docs.map( doc => {
      const {   viewSubscriptions, createSubscriptions, updateSubscriptions, deleteSubscriptions,
                viewMovies, createMovies, updateMovies, deleteMovies } = doc.data();
        return {
                id: doc.id,
                viewSubscriptions, 
                createSubscriptions, 
                updateSubscriptions,
                deleteSubscriptions,
                viewMovies,
                createMovies,
                updateMovies,
                deleteMovies
                }
    } )
    return transformedCollections;
  }

  //for members
  export const getCollectionMembersSnapshotToMap = (collection) => {
    const transformedCollections = collection.docs.map( doc => {
      const { name, email, city } = doc.data();

      return {
        id: doc.id,
        name, 
        email, 
        city
      }
    } );
    return transformedCollections;
  } 

  //update user data in firebase
  export const updateUserDateInFireBase = async (id, name, email, createdAt) => {
    var userData = {
      displayName: name,
      id: id,
      email: email,
      createdAt: createdAt,
    };

    try {
      const userRef = firestore.collection('users').doc(id);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      batch.update(userRef, userData);
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

  //update user permissions data in firebase
  export const updateUserPermissionsDateInFireBase = async (id, permissions) => {
    const {   viewSubscriptions, createSubscriptions, updateSubscriptions, deleteSubscriptions,
      viewMovies, createMovies, updateMovies, deleteMovies } = permissions;
      // A post entry.
    var userData = {
      id: id,
      viewSubscriptions, 
      createSubscriptions, 
      updateSubscriptions,
      deleteSubscriptions,
      viewMovies,
      createMovies,
      updateMovies,
      deleteMovies
    };

    try {
      const userRef = firestore.collection('permissions').doc(id);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      batch.update(userRef, userData);
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

  // delete user from firebase 
  export const deleteUserFromFirebase = async (id) => {
    try {
      const userRef = firestore.collection('users').doc(id);
      const permissionsUserRef = firestore.collection('permissions').doc(id);
      //with batch object we add al the sets must to add all if not not set anyone
      const batch = firestore.batch();
      batch.delete(userRef);
      batch.delete(permissionsUserRef);
      // async request -> return a promise
      return await batch.commit();
    } catch(err) {
      console.log(err);
    }
  }

  // update movie data in firebase
  export const updateMovieDataInFirebase = async (id, name, image, premiered ,genres) => {
  var movieData = {
    name,
    image,
    premiered,
    genres
  };

  try {
    const movieRef = firestore.collection('movies').doc(id);
    //with batch object we add all the sets must to add all if not not set anyone
    const batch = firestore.batch();
    batch.update(movieRef, movieData);
    // async request -> return a promise
    return await batch.commit();
  } catch(err) {
    console.log(err);
  }
}

// delete movie from firebase
export const deleteMovieFromFirebase = async (id, collectionName) => {
  try {
    const collectionRef = firestore.collection(collectionName).doc(id);
    //with batch object we add al the sets must to add all if not not set anyone
    const batch = firestore.batch();
    batch.delete(collectionRef);
    // async request -> return a promise
    return await batch.commit();
  } catch(err) {
    console.log(err);
  }
}

//update member data in firebase
export const updateMemberDataInFirebase = async (id, name, email, city, collection) => {
  var memberData = {
    name,
    email,
    city
  };

  try {
    const memberRef = firestore.collection(collection).doc(id);
    //with batch object we add all the sets must to add all if not not set anyone
    const batch = firestore.batch();
    batch.update(memberRef, memberData);
    // async request -> return a promise
    return await batch.commit();
  } catch(err) {
    console.log(err);
  }
}

// delete member from firebase
export const deleteMemberFromFirebase = async (id, collectionName) => {
  try {
    const collectionRef = firestore.collection(collectionName).doc(id);
    //with batch object we add al the sets must to add all if not not set anyone
    const batch = firestore.batch();
    batch.delete(collectionRef);
    // async request -> return a promise
    return await batch.commit();
  } catch(err) {
    console.log(err);
  }
}

// check if member exist, no -> create a new , yes -> update in firebase
export const checkMemberInFirebase = async (collectionName, id, objectToAdd ) => {
  try {
    const memberRef = firestore.collection(collectionName).doc(id);
    const batch = firestore.batch();
    const doc = await memberRef.get();
    if (!doc.exists) {
      console.log('No such document!');
      batch.set(memberRef, objectToAdd);
    } else {
      console.log('Document data:', doc.data());
      // const membermovieRef = memberRef.collection('movies')
      // console.log(membermovieRef)
      batch.update(memberRef, objectToAdd);
    }
    // const collectionRef = firestore.collection(collectionName);
    // //with batch object we add al the sets must to add all if not not set anyone
    // const batch = firestore.batch();
    // const newDocRef = collectionRef.doc(id); // firebase render an id for the collection
    // batch.set(newDocRef, objectToAdd);
    // // async request -> return a promise
    return await batch.commit();
  
  } catch(err) {
    console.log(err);
  }
}

// get movies from subscriptions collection by member id
export const getMoviesByMemberid = (collection) => {
    
    const transformedCollections = collection.docs.map( doc => {
      const { movies } = doc.data();

      return {
        id: doc.id,
        movies
      }

    } );
    return transformedCollections;
  }

export default firebase;