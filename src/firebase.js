// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZDtM_atV1gsukGEhNWTfvHA2M3poEa8w",
  authDomain: "machupicchu-1e1b2.firebaseapp.com",
  projectId: "machupicchu-1e1b2",
  storageBucket: "machupicchu-1e1b2.appspot.com",
  messagingSenderId: "940031202042",
  appId: "1:940031202042:web:76a1ea2bcda8be2f35af43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
