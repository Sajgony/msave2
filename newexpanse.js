// 6. Add Expanse--------------------------------------------------------------------------

function AddExpanse() {

  cycleRef.get().then(function (doc) {
     // 6.1 Determination of day


     // 6.2 Calculations
    var x = doc.data();
    var xexpanse = parseInt(addExpanse.value, 10);
    var xspent = parseInt(x.spent, 10);
    var newSpent = xexpanse + xspent;
    var newMoneyLeft = x.budget - newSpent;
    console.log("6. " + xexpanse + " + " + xspent + " is " + newSpent + " = total spending ... " + x.budget + " - " + newSpent + "  money left = " + newMoneyLeft);
    
    // 6.3 Update DB 
    cycleRef.update({
      spent: newSpent,
      left: newMoneyLeft
    }).then(function () {  dayOfCycle();  })
  })
}
