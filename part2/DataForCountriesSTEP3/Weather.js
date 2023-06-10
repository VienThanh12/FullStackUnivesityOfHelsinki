import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({countryToShow}) => {
    const api_key = process.env.REACT_APP_API_KEY
    //console.log(api_key)
    const [weather, setWeather] = useState([])
    var lat = 0, lon = 0
    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then(response => {
        //console.log(response.data)
        setWeather(response.data)
        console.log("fetch", weather)
        })
    }, [])

    if(countryToShow.length === 1){
        console.log(api_key)
        console.log("fetch", weather)
    lat = countryToShow[0].latlng[0]
    lon = countryToShow[0].latlng[1]
    var temp = weather.main.temp - 273.15
    //console.log(temp)
    temp = temp.toFixed(2)
    //console.log(weather.weather[0].icon)
    //console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    const URL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    console.log(URL)
    return (
        <div>
            <b> <h1> Weather in {countryToShow[0].capital} </h1> </b>
            <p> temperature {temp} Celcius</p>
            <img src = {URL}></img>
            <p> wind {weather.wind.speed} m/s</p>
        </div>
        )
    }
}
export default Weather
