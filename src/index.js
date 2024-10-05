import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from "firebase/compat/app";

const firebaseConfig = {

    apiKey: "AIzaSyDl2jNM8P8bwNPlDeB9L2gr31tCOWPuLAM",

    authDomain: "movies-app-38469.firebaseapp.com",

    databaseURL: "https://movies-app-38469-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "movies-app-38469",

    storageBucket: "movies-app-38469.appspot.com",

    messagingSenderId: "929126028911",

    appId: "1:929126028911:web:cd3bc58acb99bb2d4a1f9a",

    measurementId: "G-9CKXG52YR2"

};

export const Context = createContext(null)

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Context.Provider value={{
        app,
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
