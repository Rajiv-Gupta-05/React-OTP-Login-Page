import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCN-ZC6WxRWwl7oiHic4aR1Bnt9v_1iWz0",
  authDomain: "otp-login-4ed93.firebaseapp.com",
  projectId: "otp-login-4ed93",
  storageBucket: "otp-login-4ed93.appspot.com",
  messagingSenderId: "308316976295",
  appId: "1:308316976295:web:4a1072e6fe534c24d85782"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
