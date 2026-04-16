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