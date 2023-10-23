import { initializeApp } from 'firebase/compat/app';
import { getAnalytics } from 'firebase/compat/analytics';
import { getAuth } from 'firebase/compat/auth';
import firebaseui from 'firebaseui';
// adding here
import 'firebaseui/dist/firebaseui.css';

const firebaseConfig = {
  apiKey: "AIzaSyCS95Z9r-h3s2CNDp6ugTKdjjm2wmi6cAA",
  authDomain: "food-oasis-8fb7a.firebaseapp.com",
  databaseURL: "https://food-oasis-8fb7a-default-rtdb.firebaseio.com",
  projectId: "food-oasis-8fb7a",
  storageBucket: "food-oasis-8fb7a.appspot.com",
  messagingSenderId: "376961100739",
  appId: "1:376961100739:web:d577cb74df3bb08b176b76",
  measurementId: "G-LDRHY9JG5L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

var uiConfig = {
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  }
};


const ui = new firebaseui.auth.AuthUI(auth);

ui.start('#firebaseui-auth-container', uiConfig);