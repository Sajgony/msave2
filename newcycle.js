// 5. Create New Cycle--------------------------------------------------------------------------

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
        endyear: v2arYear,
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


function dayOfCycle() {

    //What day is today?
    var today = new Date();
    todayYear = today.getFullYear();
    todayMonth = today.getMonth() + 1;
    todayDay = today.getDate();

    if (todayMonth < 10) { todayMonth = '0' + todayMonth }
    if (todayDay < 10) { todayDay = '0' + todayDay }

    var fullTodayDate = parseInt(todayYear + '' + todayMonth + '' + todayDay);

    console.log("today is " + fullTodayDate);


    //Day Of Cycle
    cycleRef.get().then(function (cycle) {
        var x = cycle.data();

        var timespan = x.timespan;
        var endday = x.endday;
        var endmonth = x.endmonth;
        var endyear = x.endyear;
        var startday = x.startday;
        var startmonth = x.startmonth;
        var startyear = x.startyear;

        if (endmonth < 10) { endmonth = '0' + endmonth }
        if (endday < 10) { endday = '0' + endday }
        if (startday < 10) { startday = '0' + startday }
        if (startyear < 10) { startyear = '0' + startyear }

        var fullStartDate = parseInt(startyear + '' + startmonth + '' + startday);
        var fullEndDate = parseInt(endyear + '' + endmonth + '' + endday);

        if (fullStartDate <= fullTodayDate && fullEndDate >= fullTodayDate) {


            console.log("this day is in the cycle");

            function getDaysInMonth(m, y) { // funkce na vypocteni dnu v mesici
                return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
            }

            var yMonth = todayMonth; // Prvotni hodnoty k loopu
            var yYear = todayYear;
            var timeLeft = 1;

            for (; ;) { //tento loop vypocte zbyvajici dny
                timeLeft = timeLeft + getDaysInMonth(yMonth, yYear); // + pocet dni v prvnim mesici
                if (yMonth === endmonth && yYear === endyear) // vsechny mesice byly nalezeny
                {
                    var y = getDaysInMonth(yMonth, yYear);
                    timeLeft = timeLeft - (y - endday) - todayDay; //odecti navic dny
                    break;  //opust foor loop
                }
                else if (yMonth === 12) { yYear = yYear + 1; yMonth = 0; } //pokud jdeme do noveho roku
                yMonth = yMonth + 1; //pricti dalsi mesic
            }
           
           
            var moneyLeft = x.left;  ///////////////Chyba ... Nacita starou hodnotu
            var newPerDay = moneyLeft / timeLeft;
            console.log("Zbyva dni: " + timeLeft + " nove muzes utratit: " + newPerDay + " zbyva penez: " + moneyLeft)  ;

            cycleRef.update({
                currperday: newPerDay
            })

            docRef.update({
                activeday: timespan - timeLeft,
                daysremaining: timeLeft
            })


        }
        else {
            console.log("this day is not in the cycle");
        }


    })
}