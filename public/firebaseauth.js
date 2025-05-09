import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyArQvAuY0xmga0AZnry8aXHdeEHRSYd4JQ",
    authDomain: "project-1-ad6ce.firebaseapp.com",
    projectId: "project-1-ad6ce",
    storageBucket: "project-1-ad6ce.firebasestorage.app",
    messagingSenderId: "82613348091",
    appId: "1:82613348091:web:83feb8c63ec5b62487b25e"
  };

const app = initializeApp(firebaseConfig);
console.log("Firebase initialized");

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    

    const userData = {
      email,
      firstName,
      lastName,
    };

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);
    alert('Account created and data saved!');
     window.location.href = "index.html"; // only redirect if needed

  } catch (error) {
    console.error('Error:', error.code, error.message);
  }
});


document.getElementById('signinForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('loggedInUser',user.uid);
        alert('logged in successfully!');
        window.location.href = 'homepage.html';
      })
      .catch((error) => console.log(error))
  });