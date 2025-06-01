
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDnNaWt0pMveeI0Tf8Okd2E9v_9jGdSNhQ",
authDomain: "comicverse-60d32.firebaseapp.com",
projectId: "comicverse-60d32",
storageBucket: "comicverse-60d32.firebasestorage.app",
messagingSenderId: "1059157336409",
appId: "1:1059157336409:web:895da9aa915803e970ac48",
measurementId: "G-WRZDLR3465"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export function crearusuario(email,password){
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    
})
.catch((error) => {
    console.log(error.code,error.message); //para ver el error en caso de q haya
    
});
}
export { auth };