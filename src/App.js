import React, { useState } from 'react'

const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === 'Enter') {
      console.log(api.key);
      fetch(`${api.base}weather?q=${query}&units=metric&lang=es&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 20)
          ? 'app warm'
          : 'app')
        : 'app'}
    >
      <main>
        <div className="search-box">
          <input
            type="search"
            className="search-bar"
            placeholder="Buscar..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="picture">
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
              </div>
              <div className="weather">
                {capitalize(weather.weather[0].description)}
              </div>
              <div className="temp">
                {Math.round(weather.main.temp)}°C
            </div>
            </div>
          </div>
        ) : ('')}

      </main>
    </div>
  );
}

export default App;
