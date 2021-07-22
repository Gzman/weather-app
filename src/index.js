import { format } from "date-fns";

const DATE_FORMAT = "EEEEEE, dd.MM.yyyy h";
const API_KEY = "7bf4e96eb588df03c23b0da0f66c4a85";

const renderFeedback = (errors) => {
    const $feedback = document.querySelector(".feedback");
    errors.forEach((error) => {
        const $error = document.createElement("p");
        $error.textContent = error;
        $feedback.append($error);
    });
    $feedback.classList.add("showItem");
    setTimeout(() => {
        $feedback.textContent = "";
        $feedback.classList.remove("showItem");
    }, 3400);
};

const process = (weatherData) => {
    if (weatherData) {
        const { name } = weatherData;
        const { description } = weatherData.weather[0];
        const { temp, feels_like, humidity } = weatherData.main;
        const { speed, deg } = weatherData.wind;
        return {
            city: name,
            description,
            temp,
            feels_like,
            humidity,
            wind: {
                speed,
                deg,
            },
        }
    }
}

const render = (weather) => {
    const { city, description, temp, feels_like, humidity, wind } = weather;
    const today = format(new Date(), DATE_FORMAT);
    document.querySelector(".weather-container").classList.add("showWeather");
    const $cityName = document.querySelector(".city-name");
    const $date = document.querySelector(".weather-date");
    const $description = document.querySelector(".description-text");
    const $temp = document.querySelector(".temp-value");
    const $feelsLike = document.querySelector(".feels-like-value");
    const $humidity = document.querySelector(".humidity-value");
    const $speed = document.querySelector(".speed-value");
    const $direction = document.querySelector(".direction-value");
    $cityName.textContent = `${city}`;
    $date.textContent = `${today}h`;
    $description.textContent = description;
    $temp.textContent = temp;
    $feelsLike.textContent = feels_like;
    $humidity.textContent = humidity;
    $speed.textContent = wind?.speed;
    $direction.textContent = wind?.deg;
}

const getWeatherData = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},uk&units=metric&APPID=${API_KEY}`, { mode: "cors" })
        .then((response) => response.json())
        .then((json) => process(json))
        .then((weather) => render(weather))
        .catch((err) => {
            document.querySelector(".weather-container").classList.remove("showWeather");
            console.log(err);
            renderFeedback(["City not found"]);
        });
}

document.querySelector("#submit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const city = document.querySelector("#city-input").value;
    if (city.length > 0) {
        getWeatherData(city);
        const $form = document.querySelector("#city-form");
        $form.reset();
    } else {
        renderFeedback(["Enter a city"]);
    }
});