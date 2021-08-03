import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCIorYsvZvnP8I29W0E1OPTY88hc-BFbks",
    authDomain: "diversify-your-reading.firebaseapp.com",
    projectId: "diversify-your-reading",
    storageBucket: "diversify-your-reading.appspot.com",
    messagingSenderId: "273274155737",
    appId: "1:273274155737:web:2eb0a097865df19a55c4c8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firestore };