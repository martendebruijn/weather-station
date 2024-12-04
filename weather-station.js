function createListItem(term, description) {
  return `<dt>${term}</dt>
  <dd>${description}</dd>`
}

function epochToDate(epochDate) {
  return new Date(epochDate * 1000)
}

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

      const { weather, temperature, wind, last_updated } = data


      weatherEl.innerHTML = `
      <h2>City: ${data.city}</h2>
      <dl>
        ${createListItem('Weather:', weather.main)}
        ${createListItem('Weather description:', weather.description)}
        ${createListItem('Temperature:', temperature.actual)}
        ${createListItem('Min temperature:', temperature.min)}
        ${createListItem('Max temperature:', temperature.max)}
        ${createListItem('Temperature feels like:', temperature.feels_like)}
        ${createListItem('Wind speed:', wind)}
        ${createListItem('Last updated:', epochToDate(last_updated).toLocaleString())}
      </dl>
    `;
    })
    .catch((error) => {
      console.error(error);
    });
}

loadWeatherData();
