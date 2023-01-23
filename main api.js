const api = {
    key: "46b81619b296428197a8a0496bedb4d8",
    base:"https://timezone.abstractapi.com/v1/current_time/?api_key="
}

const api2 = {
    key: "072b4e9a03c627b27184a0d0c5ee239b",
    base: "https://api.openweathermap.org/data/2.5/"

}
  function logTime() {
  mytime.innerText = `Time: ${new Date().toLocaleTimeString()}`;
}
  
setInterval(logTime, 1000);

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        getResults2(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}${api.key}&location=${query}`)
    .then(mytimezone => {
        return mytimezone.json();
    }).then(displayResults);
}

function displayResults(mytimezone){
    let get_datetime = mytimezone.datetime;
    const array_datetime = get_datetime.split(" ");
    let mydate = document.querySelector('#mydate');
    let mytime = document.querySelector('#mytime');
    //mytime.innerText = `Time: ${array_datetime[1]}`;
    mydate.innerText = `Date: ${array_datetime[0]}`;

    let timezonename = document.querySelector('#timezone-name');
    timezonename.innerText = `Timezone Name: ${mytimezone.timezone_name}`;

    let timezonelocation = document.querySelector('#timezone-location');
    timezonelocation.innerText = `Timezone Location: ${mytimezone.timezone_location}`;

    

}

function getResults2 (query) {
    fetch(`${api2.base}weather?q=${query}&units=metric&APPID=${api2.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults2);
}
  
function displayResults2 (weather) {
    document.getElementById("temperature").innerText = `${weather.main.temp} °c`;
    document.getElementById("wind").innerText = weather.wind.speed + "km/h";
    const {main} = weather.weather[0];
    document.getElementById("weather").innerText = main;
}
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }