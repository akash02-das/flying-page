// DOM Elements
const date = document.getElementById('date');
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

// WEATHER SECTION
window.addEventListener('load', () => {

    let long;
    let lat;

    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span sup');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    //console.log(data);

                    getDataFromApi(data);
                });
        });
    }

    // GET DATA FROM API
    function getDataFromApi(data) {

        const {
            temperature
        } = data.currently;

        // Set DOM elements from the API
        temperatureDegree.textContent = Math.round(temperature);
        locationTimezone.textContent = data.timezone;

        // Formula for Celsius
        let celsius = (temperature - 32) * (5 / 9);

        // Convert Temperature to Celsius/Fahrenheit
        temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.round(celsius);
            } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.round(temperature);
            }
        });
    }
});
// WEATHER SECTION END

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

    let hour = today.getHours();
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