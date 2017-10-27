<html>

<head>
  <title>msave0.2</title>
</head>

<body>
<h1 id="hotDogOutput">Hot dog status</h1>
<input type="textfield" id="latestHotDogStatus">
<button id="saveButton">Save</button>
<button id="loadButton">Load</button><br>




<!--Import Firebase -->
<script src="https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.9.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.9.0/firebase-database.js"></script> 

<script src="script.js"></script>

</body>
</html>



/** Script.js */

// Conection to Firebase
var config = {
  apiKey: "AIzaSyBcTy3wtLKoTNXQ_S7AUp5vMGH9h9yEdLk",
  authDomain: "msave-2-firestore.firebaseapp.com",
  databaseURL: "https://msave-2-firestore.firebaseio.com",
  projectId: "msave-2-firestore",
  storageBucket: "msave-2-firestore.appspot.com",
  messagingSenderId: "930749833897"
};
firebase.initializeApp(config);


var firestore = firebase.firestore();

docRef = firestore.doc("samples/sandwichData")
const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function () {
  const textToSave = inputTextField.value;
  console.log("I am going to save" + textToSave + "to Firestore")
  docRef.set({
    hotDogStatus: textToSave
  }).then(function() {
    console.log("Status saved!" + user.email);
  }).catch(function(error) {
    console.log("Got an error:", error);
  });
});
loadButton.addEventListener("click", function() {
    docRef.get().then(function(doc){
      if (doc && doc.exists) {
        const myData = doc.data();
        outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
      }
    }).catch(function(error) {
    console.log("Got an error:", error);
  });  
});

