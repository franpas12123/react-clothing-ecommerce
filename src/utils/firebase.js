import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3Jp5dgNyWukGqA7re_KL3GobUoW5NXEs",
  authDomain: "react-clothing-ecommerce-83759.firebaseapp.com",
  projectId: "react-clothing-ecommerce-83759",
  storageBucket: "react-clothing-ecommerce-83759.firebasestorage.app",
  messagingSenderId: "794536615552",
  appId: "1:794536615552:web:6fade7d6f003808bff9065"
};

export const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(app);

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.error('Error creating user', {error});
    }
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) {
    console.error('Email and password are required');
    return;
  }

  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email already in use. Please use another email.');
    } else {
      console.error('Error creating user', error);
    }
  }
}