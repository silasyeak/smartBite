import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRr4HeFf6kksxrwDQ4LbffAZHbCAJ3hLg",
  authDomain: "smartbite-f6495.firebaseapp.com",
  projectId: "smartbite-f6495",
  storageBucket: "smartbite-f6495.appspot.com",
  messagingSenderId: "431484060016",
  appId: "1:431484060016:web:28eb6c034108df5bd64fb5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { auth, db }