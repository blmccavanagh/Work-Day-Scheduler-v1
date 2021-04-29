let now = moment();

// Function to run when when document is ready
$(document).ready(function(){
    updateTimeSensitiveFunctions();
    setInterval(updateTimeSensitiveFunctions, 1000);
    load();
});

// Function to update scheduler based on current time
function updateTimeSensitiveFunctions(){
    now = moment();
    displayCurrentDateAndTime();
    colorCode();
}

// Display current date and time in the header
function displayCurrentDateAndTime(){
    $('#currentDay').text(now.format('dddd, MMMM Do YYYY h:mm a'))
}

// Function to color code scheduler based on time
// Add background color to hours of the day
// Grey if hour has passed
// - add class .past
// Red if current hour
// - add class .present
// Green for future hours
// - add class .future
function colorCode(){
    // Use the value from now.format
    // Convert string value of hour to number value
    let currentTime = parseInt(now.format('HH'));
    // Create for loop
    // if less than current time .past
    // if current time .present
    // if more than current time .future
    for (let i = 8; i <= 18; i++) {
        if (i < currentTime) {
            $('#h' + i).addClass("past");
        } else if (i === currentTime) {
            $('#h' + i).addClass("present");
        } else {
            $('#h' + i).addClass("future");
        }
    }
}

// Function to retrieve and display schedule
// Assign any saved text to appropriate hour in scheduler
function load() {
    for (let i = 8; i < 18; i++) {
        let hourId = ("h" + i);
        if (localStorage.getItem(hourId)) {
        document.getElementById(hourId).innerHTML = localStorage.getItem(hourId);
        }
    }
}

// Function to save schedule
// Save text input when save button is clicked
// Add click event for save buttons
// Click event stores text input in local storage
const save = document.getElementsByClassName('saveBtn');

$(save).click(function (e) {
    e.preventDefault();

    let hourIdKey = e.currentTarget.parentElement.children[1].id;
    let userInput = e.currentTarget.parentElement.children[1].value;

    localStorage.setItem(hourIdKey, userInput);
});