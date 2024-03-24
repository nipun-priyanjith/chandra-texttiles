// Import the functions from the SDKs
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Firebase configuration object containing credentials and project details
// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase with the provided configuration
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication services using the Firebase app instance
const fireDB = getFirestore(app);// Firestore database instance
const auth = getAuth(app);// Authentication instance
// Export Firestore database and Authentication instances for use in other parts of the application
export {fireDB, auth}





