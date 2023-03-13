import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDu-njIk-G2axu9w2xhnrDV6mo7SsYCvX0',
  authDomain: 'monetize-47b07.firebaseapp.com',
  projectId: 'monetize-47b07',
  storageBucket: 'monetize-47b07.appspot.com',
  messagingSenderId: '509765062812',
  appId: '1:509765062812:web:98e01a2a32c388b4e75d59',
  measurementId: 'G-F1F6KC83Z0',
};

const app = initializeApp(firebaseConfig);

const fbAuth = getAuth(app);

const fbAnalytics = getAnalytics(app);

export { fbAuth, fbAnalytics };
