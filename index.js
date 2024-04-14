/* Your Code Here */

// createEmployeeRecord function
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// createEmployeeRecords function
function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
}

// createTimeInEvent function
function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}

// createTimeOutEvent function
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employee;
}

// hoursWorkedOnDate function
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// wagesEarnedOnDate function
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// allWagesFor function
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
}

// findEmployeeByFirstName function
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// calculatePayroll function
function calculatePayroll(employeeArray) {
    return employeeArray.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

// function parseTimestamp(timestamp) {
//     const [date, time] = timestamp.split(' '); // Sectionise date and time parts
//     const [year, month, day] = date.split('-').map(Number); // Parse the date parts as numbers
//     const hour = Number(time) / 100; //converts time to hours
//     return { year, month, day, hour };
//   }

