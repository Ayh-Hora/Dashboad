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
  const tdsValue = snapshot.val(); // Fetches the latest TDS value from Firebase
  const timestamp = new Date().toLocaleString(); // Current timestamp

  // Get the TDS value element
  const tdsValueElement = document.querySelector('.value');
  const timestampElement = document.querySelector('#timestamp');

  if (tdsValue === null || tdsValue === undefined) {
    // If no data received, show "-----"
    tdsValueElement.textContent = "-----";
    tdsValueElement.style.color = "#888"; // Gray color for unavailable reading
    timestampElement.textContent = "No recent update";
  } else {
    // If data is available, show the reading
    tdsValueElement.textContent = tdsValue + " ppm";

    // Change text color based on TDS value
    if (tdsValue > 600) {
      tdsValueElement.style.color = "red"; // Set text color to red
    } else {
      tdsValueElement.style.color = "#4CAF50"; // Reset text color to green
    }

    // Update the timestamp
    timestampElement.textContent = timestamp;
  }
});
