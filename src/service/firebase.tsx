// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHOcoQtQOzUHVwPaMVwyWF5CkOuqIMSk0",
  authDomain: "trip-planner-1ec2a.firebaseapp.com",
  projectId: "trip-planner-1ec2a",
  storageBucket: "trip-planner-1ec2a.firebasestorage.app",
  messagingSenderId: "996808601508",
  appId: "1:996808601508:web:b1344a1d6e972e45105b31",
  measurementId: "G-VEFT5Q7SZ5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Function to fetch previous trips
export const fetchPreviousTrips = async (userId: any) => {
    const tripsCollection = collection(db, `users/${userId}/trips`);
    const tripSnapshot = await getDocs(tripsCollection);
    const tripList = tripSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return tripList;
};