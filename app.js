// Import Firebase SDK (for Firebase v9 and above)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuu2YfAn-eihgm-9J5yAk3UL2Gt1NKixg",
  authDomain: "autotank-with-purity-detection.firebaseapp.com",
  databaseURL: "https://autotank-with-purity-detection-default-rtdb.firebaseio.com",
  projectId: "autotank-with-purity-detection",
  storageBucket: "autotank-with-purity-detection.firebasestorage.app",
  messagingSenderId: "797928366014",
  appId: "1:797928366014:web:dbc75b05b884c4428523ef",
  measurementId: "G-DRY1Q95DSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to the Firebase Realtime Database
const dbRef = ref(db, '/TDS_Value');

// Listen for changes to the data and update the UI automatically
onValue(dbRef, (snapshot) => {
  const tdsValue = snapshot.val();  // Fetches the latest TDS value from Firebase
  const timestamp = new Date().toLocaleString(); 

  // Update the TDS value in the webpage
  document.querySelector('.value').textContent = tdsValue + " ppm";
  document.querySelector('#timestamp').textContent = timestamp;

  // Suggestion based on TDS value
  let suggestion = "";
  if (tdsValue < 50) {
    suggestion = "Water quality is excellent. Enjoy your pure water!";
  } else if (tdsValue >= 50 && tdsValue <= 150) {
    suggestion = "Water quality is good, but consider a filter if needed.";
  } else if (tdsValue > 150 && tdsValue <= 300) {
    suggestion = "Water quality is average. It's recommended to use a water purifier.";
  } else {
    suggestion = "Water quality is poor. It is advisable to use a good water filter or purifier.";
  }


  document.querySelector('#suggestion-text').textContent = suggestion;
});
