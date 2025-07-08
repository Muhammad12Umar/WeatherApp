const search = document.querySelector(".search");
const date = document.querySelector(".date");
const locationEl = document.querySelector(".location");
const temperatur = document.querySelector(".temperature");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".detail-value");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".Pressure");
const uvIndex = document.querySelector(".UvIndex"); // Not used (see note below)

// Set current date

const apiKey = "ddfb704be1f2ba11251791a6a36882f0"; // Make sure no space at the end

search.addEventListener("submit", function (event) {
  event.preventDefault();
  const showDate = new Date().toDateString();
  date.textContent = showDate;
  
  const searchInput = event.target.searchInput.value.trim();
  if (!searchInput) {
    alert("Please Enter a city .");
    return;
  }

  fetchWeather(searchInput);
  event.target.reset();
});
function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found or API error.");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data)
      temperatur.textContent = `${data.main.temp}`;
      locationEl.textContent = data.name;
      condition.textContent = data.weather[0].description;
      humidity.textContent = `${data.main.humidity}%`;
      wind.textContent = `${data.wind.speed} km/h`;
      pressure.innerHTML = `${data.main.pressure} hPa`;
      uvIndex.textContent = `${data.main.sea_level}` // Not available in this API
    })
    .catch((err) => {
      console.error("❌ Error:", err);
      alert("❌ " + err.message);
    });
}
