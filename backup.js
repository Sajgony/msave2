////Hot Dog html////

<html>
 
<head>
  <title>msave0.2</title>
</head>

<body>
<h1 id="hotDogOutput">Hot dog status</h1>
<input type="textfield" id="latestHotDogStatus">
<button id="saveButton">Save</button>
<button id="loadButton">Load</button><br>




<!--Import Firebase  -->
<script src="https://www.gstatic.com/firebasejs/4.6.0/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.6.0/firebase-firestore.js"></script>
<script src="script.js"></script>

</body>
</html>




////HotDog js///

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




////msave js///
// 4. Create New Cycle--------------------------------------------------------------------------
function createCycle() {

  var date = $('#datepicker').val();
  console.log(date);

  var startDateX = startDate.value;
  //var startDateY = startDateX.getDate(); 
  console.log(startDateX);

  newCycleNumber = UserData.activecycle + 1;
  cycleRef = firestore.doc('/msave/core/users/' + User.email + '/cycles/' + newCycleNumber);
  todayDate = new Date();

   
  cycleRef.set({
    id: newCycleNumber,
    budget: newBudgetValue.value,
    created: todayDate,
    spent: "0",
    left: newBudgetValue.value,
    days: newBudgetDays.value,
    perday: newBudgetValue.value / newBudgetDays.value,
    currperday: newBudgetValue.value / newBudgetDays.value
  }) 

    // 4.1 Update new Active Cycle
    .then(function () {
      docRef.update({
        activecycle: newCycleNumber
      })
      currentCycleFrame.style.visibility = "visible"
      newCycleFrame.style.visibility = "hidden";
      console.log("5.b " + "Cycle " + newCycleNumber + " has been created and set as active cycle");

    })
}





