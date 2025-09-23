import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getRemoteConfig, getValue, fetchAndActivate } from 'firebase/remote-config';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth and export it
export const auth = getAuth(app)
export { app as firebaseApp }

export const remoteConfig = getRemoteConfig(app);
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000,
  fetchTimeoutMillis: 60000,
};
remoteConfig.defaultConfig = {
  darkmode: 'false',
};

export async function getDarkModeRemoteConfig() {
  await fetchAndActivate(remoteConfig);
  const darkModeValue = getValue(remoteConfig, 'darkmode').asString();
  return darkModeValue === 'true';
}
