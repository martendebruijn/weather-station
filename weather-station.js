function loadWeatherData() {
  const jsonFile = "weather_data.json";

  fetch(jsonFile)
    .then((response) => {
      if (!response.ok)
        throw new Error("Something went wrong with loading the JSON file.");
      return response.json();
    })
    .then((data) => {
      const weatherEl = document.getElementById("weather");
      if (weatherEl === null)
        throw new Error('An element with the id of "weather" doesn\'t exists.');
      weatherEl.innerHTML = `
      <h2>City: ${data.city}</h2>
      <p>Temperature: ${data.temperature}</p>
    `;
    })
    .catch((error) => {
      console.error(error);
    });
}

loadWeatherData();
