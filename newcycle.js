// 4. Create New Cycle--------------------------------------------------------------------------

function createCycle(f1, f2) {

    //initial values
    newCycleNumber = UserData.activecycle + 1;
    cycleRef = firestore.doc('/msave/core/users/' + User.email + '/cycles/' + newCycleNumber);
    todayDate = new Date();

    //Load Date string from inputs
    var v1 = document.getElementById(f1).value;
    var v2 = document.getElementById(f2).value;

    var v1ar = v1.split("-"); //Vymazani znamenek "-"" a prevedeni na number
    var v1arYear = parseInt(v1ar[0]);
    var v1arMonth = parseInt(v1ar[1]);
    var v1arDay = parseInt(v1ar[2]);

    var v2ar = v2.split("-");
    var v2arYear = parseInt(v2ar[0]);
    var v2arMonth = parseInt(v2ar[1]);
    var v2arDay = parseInt(v2ar[2]);

    function getDaysInMonth(m, y) { // funkce na vypocteni dnu v mesici
        return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
    }

    var xMonth = v1arMonth; // Prvotni hodnoty k loopu
    var xYear = v1arYear;
    var timeSpan = 1;

    for (; ;) { //tento loop vypocte celkovy pocet dni

        timeSpan = timeSpan + getDaysInMonth(xMonth, xYear); // + pocet dni v prvnim mesici

        if (xMonth === v2arMonth && xYear === v2arYear) // vsechny mesice byly nalezeny
        {
            var x = getDaysInMonth(xMonth, xYear);
            timeSpan = timeSpan - (x - v2arDay) - v1arDay; //odecti navic dny
            break;  //opust foor loop
        }

        else if (xMonth === 12) { xYear = xYear + 1; xMonth = 0; } //pokud jdeme do noveho roku
        xMonth = xMonth + 1; //pricti dalsi mesic

    }

    console.log(timeSpan)


    //write data into new cycle DB 
    cycleRef.set({
        id: newCycleNumber,
        budget: newBudgetValue.value,
        created: todayDate,
        spent: "0",
        left: newBudgetValue.value,
        perday: newBudgetValue.value / timeSpan,
        currperday: newBudgetValue.value / timeSpan,
        startyear: v1arYear,
        startmonth: v1arMonth,
        startday: v1arDay,
        endtyear: v2arYear,
        endmonth: v2arMonth,
        endday: v2arDay,
        timespan: timeSpan
    })


        .then(function () {
            docRef.update({
                activecycle: newCycleNumber
            })
            currentCycleFrame.style.visibility = "visible"
            newCycleFrame.style.visibility = "hidden";
            console.log("4. " + "Cycle " + newCycleNumber + " has been created and set as active cycle");

        })

}