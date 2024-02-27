import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpKl7WyQAF_O2SaipPBK8tY8OTgU7rfBs",
    authDomain: "archi-3.firebaseapp.com",
    projectId: "archi-3",
    storageBucket: "archi-3.appspot.com",
    messagingSenderId: "999325378837",
    appId: "1:999325378837:web:04cd14c0911d8a6db5611c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();

export async function registerUserWithEmailAndPassword(email, password) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (err) {
        throw err;
    }
}

export async function loginWithEmailAndPassword(email, password) {
    try {
        const user = signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (err) {
        throw err;
    }
}

export async function loginWithGoogle() {

    try {
        const result = await signInWithPopup(auth, providerGoogle);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        return result;
    } catch (err) {
        throw err;
    }
}

export async function logout() {
    await signOut(auth);
}

export async function authenticateUser() {
    return new Promise((resolve, reject) => {
        try {
            onAuthStateChanged(auth, (user) => resolve(user));
        } catch (err) {
            reject(err);
        }
    });
}