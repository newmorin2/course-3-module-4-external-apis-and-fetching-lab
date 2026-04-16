// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts");
    }

    const data = await response.json();

    console.log(data); // for testing
    displayAlerts(data);
    clearError();

  } catch (error) {
    console.log(error.message);
    showError(error.message);
  }
}
function displayAlerts(data) {
  const alertContainer = document.getElementById("alerts");
  alertContainer.innerHTML = ""; 

  const title = data.title;
  const alerts = data.features;

  const summary = document.createElement("h2");
  summary.textContent = `${title}: ${alerts.length}`;
  alertContainer.appendChild(summary);

  const ul = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertContainer.appendChild(ul);
}