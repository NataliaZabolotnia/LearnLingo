import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD21C_GWtb2PdJSMkhcFf_MOE7fui7Wz-4',
  authDomain: 'teachers-app-5031f.firebaseapp.com',
  projectId: 'teachers-app-5031f',
  storageBucket: 'teachers-app-5031f.firebasestorage.app',
  messagingSenderId: '326858861344',
  appId: '1:326858861344:web:4caa304019150e134a8545',
  databaseURL:
    'https://teachers-app-5031f-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
// export const database = getFirestore(app);
console.log('🔥 FIREBASE DB:', database);
