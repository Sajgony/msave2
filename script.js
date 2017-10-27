// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBSmcO-NC6t6xZbcMQuBLLPWfbJb7Wozwc",
    authDomain: "firecloud2-aac4c.firebaseapp.com",
    databaseURL: "https://firecloud2-aac4c.firebaseio.com",
    projectId: "firecloud2-aac4c",
    storageBucket: "firecloud2-aac4c.appspot.com",
    messagingSenderId: "870285831664"
  };
  firebase.initializeApp(config);


var firestore = firebase.firestore();



// Authentication
var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function (result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;


  // *** Retrive the Initial Values
 // var dbRef = firebase.database().ref('users/' + user.uid + '/value');
//  dbRef.on("value", function (snapshot) {
  //  iniVal = snapshot.val();
  //  console.log(iniVal);
 //   document.getElementById("showval").value = iniVal;
//  });

  // *** Greet Users with their email name
  //document.getElementById("name").innerText = "Welcome back " + user.displayName;
 // document.getElementById("email").innerText = user.email;

}).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});






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
    console.log("Status saved!" );
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

