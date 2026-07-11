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

    apiKey: "AIzaSyCEn8iLAlQr2B425NRQZMjPPsHF81PheRM",

    authDomain: "bsh-fik1-spc.firebaseapp.com",

    projectId: "bsh-fik1-spc",

    storageBucket: "bsh-fik1-spc.firebasestorage.app",

    messagingSenderId: "492480158655",

    appId: "1:492480158655:web:ef774f7bd57d1a58761f0a"

};


// Firebase Başlat
const app = initializeApp(firebaseConfig);


// Servisler
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export default app;