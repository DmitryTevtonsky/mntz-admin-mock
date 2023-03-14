import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCGLonGWXrXHouvlkBVBubqcl2iW-TM6-E',
  authDomain: 'mntz-admin-mock.firebaseapp.com',
  projectId: 'mntz-admin-mock',
  storageBucket: 'mntz-admin-mock.appspot.com',
  messagingSenderId: '326487083725',
  appId: '1:326487083725:web:42b3eb27f1ba7193d0b784',
};

const app = initializeApp(firebaseConfig);

const fbAuth = getAuth(app);

const fbAnalytics = getAnalytics(app);

export { fbAuth, fbAnalytics };
