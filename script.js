const currentCycleFrame = document.querySelector("#currentCycleFrame");
const newCycleFrame = document.querySelector("#newCycleFrame");
const newBudgetValue = document.querySelector("#NewBudgetValue");
const userNameHolder = document.querySelector("#name");

const showNewSpentperDay = document.querySelector("#showNewSpentperDay");
const showSpentperDay = document.querySelector("#showSpentperDay");
const showBudget = document.querySelector("#showBudget");
const showSpent = document.querySelector("#showSpent");
const showMoneyLeft = document.querySelector("#showMoneyLeft");
const addExpanse = document.querySelector("#addExpanseInput");
const startDate = document.querySelector("#startDate");

var User = "";
var UserData = "";
var cycleData = ""; // not used probably delete it 
var docRef = "";
var cycleRef = "";

var todayYear = "";
var todayMonth = "";
var todayDay = "";


// 2. Initialize Firebase-------------------------------------------------------------------------
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


// 3. Authentication--------------------------------------------------------------------------------
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function (result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log("1. " + user.email + " is logged");
  // Exposing user as Global variable     
  User = user;


  // 3.1 User Clasification
  docRef = firestore.doc('msave/core/users/' + user.email);

  docRef.get().then(function (doc) {
    if (doc && doc.exists) {
      x = doc.data();
      console.log("2.a " + "User: " + x.name + " founded in db");

    }
    else {
      docRef.set({
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
        uid: user.uid,
        activecycle: 0,
        activeday: -1,
        daysremaining: -1
      })
        .then(function () {
          console.log("2.b " + "User Created");
        })
    }
  })

    // 3.2 Showing Interface based on Cycle number
    .then(function () {
      docRef.get().then(function (doc) {
        x = doc.data();
        var cycleRef = x.activecycle;
        if (cycleRef === 0) {
          console.log("3.a " + "User's cycle is 0, loading new cycle interface");
          newCycleFrame.style.visibility = "visible";
        }
        else {
          console.log("3.b " + "User's cycle is  = " + cycleRef);
          currentCycleFrame.style.visibility = "visible";
        }
      })
    })

    // 3.3 Pre-load Main Screen 
    .then(function () {
      docRef.onSnapshot(function (doc) {
        UserData = doc.data(); //Exposing UserData 
        cycleRef = firestore.doc('/msave/core/users/' + UserData.email + '/cycles/' + UserData.activecycle); // Exposing cuurent Cycle
        if (UserData.activecycle != 0) { //don't update for brand new user
          dayOfCycle();
          mainScreen();
        }
      })
    })


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


// 4. Main Screen--------------------------------------------------------------------------
function mainScreen() {
  userNameHolder.innerText = "Welcome " + UserData.name + " you are on your " + UserData.activecycle + " cycle";

  cycleRef.onSnapshot(function (doc) {
    var x = doc.data();
    showNewSpentperDay.value = x.currperday;
    showSpentperDay.value = x.perday;
    showBudget.value = x.budget;
    showSpent.value = x.spent;
    showMoneyLeft.value = x.left;
    console.log("4. " + "My Budget is: " + x.budget + " I have spent: " + x.spent + " I have left:" + x.left);
  });
}

// 5. Create New Cycle--------------------------------------------------------------------------
// Placed at newcycle.js

// 6. Add Expanse--------------------------------------------------------------------------
// Placed at newexpanse.js