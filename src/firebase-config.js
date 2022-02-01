import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore';


const { REACT_APP_FIRE_PUBLIC_KEY, REACT_APP_FIRE_MSGSENDERID, REACT_APP_FIRE_APPID } = process.env;
const firebaseConfig = {
  apiKey: REACT_APP_FIRE_PUBLIC_KEY,
  authDomain: "order-shippings.firebaseapp.com",
  projectId: "order-shippings",
  storageBucket: "order-shippings.appspot.com",
  messagingSenderId: REACT_APP_FIRE_MSGSENDERID,
  appId: REACT_APP_FIRE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  db = getFirestore(app);