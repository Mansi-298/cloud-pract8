import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyArQvAuY0xmga0AZnry8aXHdeEHRSYd4JQ",
    authDomain: "project-1-ad6ce.firebaseapp.com",
    projectId: "project-1-ad6ce",
    storageBucket: "project-1-ad6ce.firebasestorage.app",
    messagingSenderId: "82613348091",
    appId: "1:82613348091:web:83feb8c63ec5b62487b25e"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUser");
  const docRef = doc(db, "users", loggedInUserId);
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("loggeduserfname").innerHTML =
          userData.firstName;
        document.getElementById("loggeduserlname").innerHTML =
          userData.lastName;
        document.getElementById("loggeduseremail").innerHTML = userData.email;
      }
    })

    .catch((error) => console.log(error));
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    signOut(auth)
    .then(() => {
        alert('signed out successfully');
        window.location.href = "index.html";
    })
    .catch((error) => console.log('error signing out',error));
})