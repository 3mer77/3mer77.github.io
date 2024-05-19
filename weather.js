
const weatherForm = document.querySelector(".Weather-form")
const Cityinput = document.querySelector(".input-btn")
const card = document.querySelector(".displayinfo")
const btn = document.getElementById("sub")
const apiKey = "7eb1af9dff9ab9990d9695624d13737d";


weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city = Cityinput.value;

    if(city){
        
        try{

            const WeatherData = await getWeatherData(city)
            displayinfo(WeatherData)
        }
        catch(error){
            console.error(error)
        }
    }
    else{
        displayError("Please enter a city")
    }
})

async function getWeatherData(city){

    const fetchurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(fetchurl)

    if(response.ok === false){
        throw new Error("Please enter a valid City")
    }

    return response.json()

}

function displayinfo(data){


    const {
        name: city,
        main:{temp, humidity},
        weather:[{description, id}]} = data;

    let displaycity = document.createElement("h2")
    let displaytemp= document.createElement("p")
    let displayhumdity= document.createElement("p")
    let displaydesc = document.createElement("p")
    let displayemoji = document.createElement("p")

    card.textContent = "";
    card.style.display ="flex"

    displaycity.textContent =  city
    displaytemp.textContent = `${(temp - 273.15).toFixed(1)} C`;
    displayhumdity.textContent = `${humidity}%`;
    displaydesc.textContent  = description
    displayemoji.textContent = getEmoji(id)

    displaytemp.classList.add("temperature")
    displayhumdity.classList.add("Humididty")
    displaydesc.classList.add("skyWeather")
    displayemoji.classList.add("WeatherEmoji")

    card.appendChild(displaycity)
    card.appendChild(displaytemp)
    card.appendChild(displayhumdity)
    card.appendChild(displaydesc)
    card.appendChild(displayemoji)
}

function getEmoji(id){

    switch(true){
        case ( id >= 200 && id < 300):
            return "🌧️";
        case ( id >= 300 && id < 400):
            return "🌧️";    
        case ( id >= 500 && id < 600):
            return "🌧️";
        case ( id >= 700 && id < 800):
            return "🌊";
        case ( id === 800):
            return "☀️";
        case ( id >= 801 && id < 810):
            return "☁️";
        default:
            return "❓"
        

    }

}

function  displayError(message){

    const errormessage = document.getElementById("errordisplay")
    errormessage.textContent = message;

    errormessage.classList.add("errordisplay")
    card.style.display = "flex"

}




