import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Daily from './components/Daily';
import Live from './components/Live';

function App() {

  const api = {
    key: process.env.REACT_APP_WEATHER_KEY,
    urlLive: "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=es",
    urlDaily: "https://api.openweathermap.org/data/2.5/onecall?units=metric&lang=es&exclude=current,minutely,hourly,alerts"
  }

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [layout, setLayout] = useState('');

  var daily = [];
  var lay = [];
  var lat;
  var long;

  const search = evt => {
    if (evt.key === 'Enter' && query !== '') {
      fetch(`${api.urlLive}&q=${query}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (typeof result.coord != "undefined") {
            setWeather(result);
            lat = result.coord.lat;
            long = result.coord.lon;
          }
        })
        .then(() => {
          if (typeof lat != "undefined" && typeof long != "undefined") {
            fetch(`${api.urlDaily}&lat=${lat}&lon=${long}&appid=${api.key}`)
              .then(res => res.json())
              .then(result => {
                daily = result.daily;
              })
              .then(() => {
                if (typeof daily != "undefined") {
                  daily.map(el => {
                    const d = getDate(el.dt);
                    lay.push(
                      <div className="dayContainer">
                        <div className="date">
                          {`${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`}
                        </div>
                        <div className="day">
                          <div class="picture">
                            <img alt="Weather Icon" src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} />
                          </div>
                          <div class="temp">
                            <div class="min">
                              {Math.round(el.temp.min)}°C
                      </div>
                            <div class="max">
                              {Math.round(el.temp.max)}°C
                      </div>
                          </div>
                        </div>
                      </div>
                    )
                  });
                  setLayout(lay);
                }
              })
          }

        });
    }
  }

  const dateBuilder = (d) => {
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

  const getDate = (u) => {
    const milis = u * 1000;
    const dateObject = new Date(milis);
    return dateObject;
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
          <Router>
            <div className="navbar">
              <NavLink to="/" exact className="nav-button" activeClassName="active">
                Actual
                  </NavLink>
              <NavLink to="/daily" className="nav-button" activeClassName="active">
                7 días
                  </NavLink>
            </div>
            <Switch>
              <Route path="/daily">
                <Daily
                  name={weather.name}
                  country={weather.sys.country}
                  date={dateBuilder(new Date())}
                  layout={layout}
                />
              </Route>
              <Route path="/">
                <Live
                  name={weather.name}
                  country={weather.sys.country}
                  date={dateBuilder(new Date())}
                  icon={weather.weather[0].icon}
                  description={capitalize(weather.weather[0].description)}
                  temp={Math.round(weather.main.temp)}
                />
              </Route>
            </Switch>
          </Router>

        ) : ('')}

      </main>
    </div>
  );

}

export default App;
