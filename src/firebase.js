import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuQnR0jzw_e-0dc0YTDoWyWkWaeEdQPoQ",
    authDomain: "progblog-ae49c.firebaseapp.com",
    projectId: "progblog-ae49c",
    storageBucket: "progblog-ae49c.appspot.com",
    messagingSenderId: "139481202837",
    appId: "1:139481202837:web:0dc1d041f95870bd755b9c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
