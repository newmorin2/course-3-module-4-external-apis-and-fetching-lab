// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");
button.addEventListener('click',() => {
    const state = input.value.trim().toUpperCase();

    alertsDisplay.innerHTML =""
    errorDiv.textContent =""
    errorDiv.classList.add("hidden")

    if(!/^[A-Z]{2}$/.test(state)){
        showError("Please enter a status code!");
        return;
    }
    fetchWeatherAlerts(state)
    input.value = ""
})

function fetchWeatherAlerts(state){
    fetch(`https://api.weather.gov/alerts/active?area=CA`)
    .then(res => {
        if(!res.ok){
            throw new Error("Invalid state code or network error")
        }
        return res.json();
    })
    .then(data => {
        displayAlerts(data);
    })
    .catch(error => {
        console.log(error.message);
        showError(error.message)
    });
}
function displayAlerts(data){
    const alerts = data.features;

    if(!alerts || alerts.length === 0){
        alertsDisplay.textContent = 'No alerts at the moment'
        return;
    }
    const summary = document.createElement('p')
    summary.textContent = `weather alerts: ${alerts.length}`;
    alertsDisplay.appendChild(summary);

    const ul =document.createElement("ul")
    alerts.forEach(alert => {
        const li = document.createElement("li")
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });
    alertsDisplay.appendChild(ul);
}
function showError(message){
    errorDiv.textContent = message
    errorDiv.classList.remove("hidden");
}