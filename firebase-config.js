// ==========================================
// BSH FIK/1 SPC
// Firebase Configuration
// ==========================================

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


// Bu bilgiler Firebase Console'dan alınacak.
const firebaseConfig = {

    apiKey: "",

    authDomain: "",

    projectId: "",

    storageBucket: "",

    messagingSenderId: "",

    appId: ""

};


// Firebase Başlat
const app = initializeApp(firebaseConfig);


// Servisler
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export default app;