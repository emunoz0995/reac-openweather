
import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/loading.svg'

function App() {

  const [climate, setClimate] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const keyApi = "e5ddd96d19987dfa360220b165ad8d5e";

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric`)
        .then(res => setClimate(res.data));
      setIsLoading(false)

    }
    navigator.geolocation.getCurrentPosition(success);

  }, []);

  const [isDegrees, setIsDegress] = useState(true)

  return (
    <div className="App">

      {isLoading ? (<><img src={reactLogo} alt="load" /> <h3>Loading...</h3> </> ) :
        (<>
          <div className="card">
            <div className="info">
              <h1>{climate.name} {" "} {climate.sys?.country}</h1>

              <p>{climate.weather?.[0].main}</p>
              <p ><i className="fa-solid fa-wind"></i> {climate.wind?.speed}</p>
              <p><i className="fa-solid fa-droplet"></i> {climate.main?.humidity}%</p>
            </div>
            <div className="ilustration">
              <img src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png`} alt="" />
              <p>{climate.weather?.[0].description}</p>
            </div>
            <div className="temperature">
              <div className="items">
                <p><i className="fa-solid fa-up-long"></i>{isDegrees ? climate.main?.temp_max : Math.floor(climate.main?.temp_max * 9 / 5) + 32}°</p>
                <p><i className="fa-solid fa-down-long"></i>{isDegrees ? climate.main?.temp_min : Math.floor(climate.main?.temp_min * 9 / 5) + 32}°</p>
              </div>
              <h1>{isDegrees ? climate.main?.temp : Math.floor(climate.main?.temp * 9 / 5) + 32}°</h1>
            </div>
          </div>
          <div className="card-button">
            <button onClick={() => setIsDegress(!isDegrees)} >{isDegrees ? "°F" : "°C"} </button>
          </div>
        </>
        )
      }
    </div>
  )
}

export default App
