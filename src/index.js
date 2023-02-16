const weatherForm = document.getElementById("weather-form");
const forecastColumns = document.getElementById("forecast-columns");
const mainTemp = document.getElementById("main-temp");
const cityName = document.getElementById("city-name");
const spanToggle = document.getElementById("toggle");
const weatherName = document.getElementsByClassName("weatherH6");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValues = e.target.search.value;
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityValues}?unitGroup=us&include=hours%2Cdays%2Ccurrent&key=PYPZ68ENJ6QARNCD9LQBJJ64J&contentType=json`;
  mainTemp.innerHTML = "";
  cityName.innerHTML = "";
  forecastColumns.innerHTML = "";

  fetch(apiUrl)
    .then((resp) => resp.json())
    .then((weatherData) => {
      renderMainSection(weatherData);
      console.log(weatherData);
      const dataValue = Object.values(weatherData);
      const weatherArray = Object.values(dataValue[7]);
      const weatherArraySlice = weatherArray.slice(0, 7);
      weatherArraySlice.forEach(renderForecast);
    });

  document.querySelector("label").classList.remove("d-none");
  document.querySelector(".forecast").classList.add("bg-img");
});

const renderMainSection = (mainValues) => {
  let valueToggle = spanToggle.getAttribute("value");
  const weatherIcon = document.createElement("img");
  const mainTemph1 = document.createElement("h1");
  const cityNameh6 = document.createElement("h6");
  mainTemph1.classList.add("display-2");
  mainTemp.classList.add("d-flex", "align-items-center");
  weatherIcon.style.width = "50px";
  weatherIcon.style.height = "50px";

  weatherIcon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${mainValues.days[0].icon}.png`;
  mainTemph1.textContent = Math.round(mainValues.days[0].temp) + "\xB0";
  cityNameh6.textContent = mainValues.resolvedAddress;

  mainTemp.appendChild(weatherIcon);
  mainTemp.appendChild(mainTemph1);
  cityName.appendChild(cityNameh6);

  spanToggle.addEventListener("click", () => {
    const toggleMainWeather = () => {
      if (valueToggle == 0) {
        valueToggle = 1;
        mainTemph1.textContent =
          Math.round((mainValues.days[0].temp - 32) * 0.555) + "\xB0";
      } else if (valueToggle == 1) {
        valueToggle = 0;
        mainTemph1.textContent = Math.round(mainValues.days[0].temp) + "\xB0";
      }
    };
    toggleMainWeather();
  });
};

const renderForecast = (forecastData) => {
  let altToggle = spanToggle.getAttribute("alt");
  const weatherDays = document.createElement("div");
  const days = document.createElement("h6");
  const weatherIcon = document.createElement("img");
  const weatherH6 = document.createElement("h6");

  weatherDays.classList.add("col", "m-4", "p-3", "border", "rounded");
  weatherIcon.classList.add("py-4");

  days.textContent = forecastData.datetime;
  weatherIcon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${forecastData.icon}.png`;
  weatherH6.textContent =
    Math.round(forecastData.tempmax) +
    "\xB0" +
    "/" +
    Math.round(forecastData.tempmin) +
    "\xB0";

  forecastColumns.appendChild(weatherDays);
  weatherDays.appendChild(days);
  weatherDays.appendChild(weatherIcon);
  weatherDays.appendChild(weatherH6);

  weatherDays.addEventListener("mouseenter", () => {
    weatherDays.classList.add("bg-shadow");
  });
  weatherDays.addEventListener("mouseleave", () => {
    weatherDays.classList.remove("bg-shadow");
  });
  spanToggle.addEventListener("click", () => {
    const toggleForecastWeather = () => {
      if (altToggle == 1) {
        altToggle = 0;
        weatherH6.textContent =
          Math.round(forecastData.tempmax) +
          "\xB0" +
          "/" +
          Math.round(forecastData.tempmin) +
          "\xB0";
      } else if (altToggle == 0) {
        altToggle = 1;
        weatherH6.textContent =
          Math.round((forecastData.tempmax - 32) * 0.555) +
          "\xB0" +
          "/" +
          Math.round((forecastData.tempmin - 32) * 0.555) +
          "\xB0";
      }
    };
    toggleForecastWeather();
  });
};
