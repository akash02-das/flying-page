// DOM Elements
const date = document.getElementById('date');
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

// Options
const showAmPm = true;

// Show Date
function showDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let myDate = new Date();
    let month = monthNames[myDate.getMonth()];
    let day = String(myDate.getDate()).padStart(2, '0');
    let year = myDate.getFullYear();
    let currentDate = `${month} ${day}, ${year}`;

    // Output Date
    date.innerHTML = currentDate;
}

// Show Time
function showTime() {
    let today = new Date();

    let hour = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    let sec = String(today.getSeconds()).padStart(2, '0');

    // Set AM / PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${sec} ${showAmPm ? amPm : ''}`;

    setTimeout(showTime, 1000);
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date();
    let hour = today.getHours();

    if (hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('./img/morning.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        greeting.textContent = 'Good Morning,';
        document.body.style.color = "#01172F";
    } else if (hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('./img/afternoon.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        greeting.textContent = 'Good Afternoon,';
        document.body.style.color = "#0C0C0C";
    } else {
        // Evening
        document.body.style.backgroundImage = "url('./img/night.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        greeting.textContent = 'Good Evening,';
        document.body.style.color = "#ffffff";
    }
}

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // make sure Enter key is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // make sure Enter key is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

// Event listener
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showDate();
showTime();
setBgGreet();
getName();
getFocus();