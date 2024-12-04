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


async function loadData() {
  const jsonFile = "weather_data.json";

  try {
    const response = await fetch(jsonFile);

    if (!response.ok)
      throw new Error("Something went wrong with loading the JSON file.");

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}



function getRootElement(id) {
  const rootEl = document.getElementById(id);
  if (rootEl === null)
    throw new Error(`An element with the id of "${id}" doesn't exists.`);
}

function createEl(tagName) {
  return () => document.createElement(tagName);
}

function createTextNode(content) {
  return document.createTextNode(content)
}

function addTo(parentEl) {
  return (child) => parentEl.appendChild(child)
}

const root = getRootElement('weather');

const createHeaderLevel2Element = createEl('h2');
const createDescriptionListElement = createEl('dl');
const createDescriptionListTermElement = createEl('dt');
const createDescriptionListDescriptionElement = createEl('dd');

function createHeader(title) {
  addTo(createHeaderLevel2Element())(createTextNode(title))
}

createHeader('City: Turnhout')

const addToRoot = addTo(root);
addToRoot(headerEl);

const dlEl = createDescriptionListElement();
const addToDl = addTo(dlEl);

function createDescriptionListItemTerm(term) {
  return addTo(createDescriptionListTermElement())(createTextNode(term));
}

function createDescriptionListItemDescription(description) {
  return addTo(createDescriptionListDescriptionElement())(createTextNode(description));
}

addToDl(createDescriptionListItemTerm('Temperature:'));
addToDl(createDescriptionListItemDescription('20 C'));

addToRoot(dlEl);

function createDescriptionListItem(term, description) {
  const dt = createDescriptionListItemTerm(term);
  const dd = createDescriptionListItemDescription(description);
  return [dt, dd]
}

function createDescriptionList() {
  const addToDl = createDescriptionListElement();

  addToDl(createDescriptionListItemTerm('Temperature'));
  addToDl(createDescriptionListItemDescription('20 C'));
}






