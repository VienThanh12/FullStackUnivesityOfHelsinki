import { useState, useEffect } from "react"
import axios from "axios"
import "./info"
import Weather from "./Weather"
const ok = false

const ShowAllTheLanguage2 = ({country}) => {
  //console.log("language")
  
  const res = country.languages
  const arr = Object.values(res)
  //console.log(res)
  //console.log(arr.map(languages => <p> {languages}</p>));
  return (
    arr.map(languages => <ul><br/> <li> {languages}</li> </ul> )
  )
}

const ShowCountry = (country, ok) => {

  //setDifferentCountry(country)
  //render (){
  //console.log(ok)
  if(ok === true)
   return (
      <div>
          <h1 key = {0}>  {country.name.common} </h1>
          <p> </p>
          <p> capital {country.capital}</p>
          <p> area {country.area} </p>
          <p> </p>
          <p> </p>
          <ul> </ul>
          <b> languages: </b>
          <br/>
          <ShowAllTheLanguage2 country = {country} />
          <img
          src = {country.flags.png} 
          alt = {country.flags.alt}
          ></img>
      </div>
    )
  //}
}
const ShowAllTheLanguage = ({countryToShow}) => {
  ////console.log("language")
  ////console.log(countryToShow[0].languages)
  
  const res = countryToShow[0].languages
  const arr = Object.values(res)
  ////console.log(res)
  ////console.log(arr.map(languages => <p> {languages}</p>));
  return (
    arr.map(languages => <ul> <li> {languages}</li> </ul> )
  )
}
const Button = ({country}) => {
  const [ok, setOk] = useState(false)
  return (
    <div>
    <button onClick = {() => setOk(true)} > show </button>
    <p> {ShowCountry(country, ok)}</p>
    </div>
  )
}
const Infor = ({countryToShow}) => {
  if(countryToShow.length !== 1) {
  return (
    countryToShow.length > 10 ? 
    <p> Too many matches, specify another filter </p> 
    : 
    countryToShow.map(country => 
    <p> 
      {country.name.common} 
      <Button country={country} />
    </p>)
  )
  }
}

const BasicInfor = ({countryToShow}) => {
  if(countryToShow.length === 1){
    return (
      <div>
        <h1 key = {0}>  {countryToShow[0].name.common} </h1> 
        <br/>
        <p> </p>
        <p> capital {countryToShow[0].capital}</p>
        <p> area {countryToShow[0].area} </p>
        <br/>
        <br/>
        <b> languages: </b>
        <br/>
        <ShowAllTheLanguage countryToShow = {countryToShow} />
        <br/>
        <img
          src = {countryToShow[0].flags.png} 
          alt = {countryToShow[0].flags.alt}
        >
        </img>
      </div>
    )
  }
  return <p> </p>
}
const App = () => {
  const [infor, setInfor] = useState([]) // list of country
  const [country, setCountry] = useState('') // enter 
  //const [differentCountry, setDifferentCountry] = useState()
  useEffect(() => {
      //console.log("fetching country")
      //console.log(country)
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setInfor(response.data)
        })
      //console.log("successful")
      //console.log({infor})
      //console.log("fetching weather map data")
  }, [])
  const countryToShow = country.length === 0 ? [] : infor.filter(infor => infor.name.common.toLowerCase().includes(country.toLowerCase()))
  //console.log(countryToShow)
  //if(countryToShow.length === 1)
    //console.log(countryToShow[0].capital)
  
  const handleChange = (event) => {
    setCountry(event.target.value)
  }
  return (
    <div>
      <form>
        find countries
        <input onChange = {handleChange}> 

        </input>
      </form>
    
    <Infor countryToShow = {countryToShow} />
    <br/>
    <BasicInfor countryToShow = {countryToShow} />
    <br/>
    <Weather countryToShow={countryToShow}/>
    </div>
  )
}


/*
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = ({notes}) => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }
  }, [currency])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }
  console(notes)
  return (
    <div>
      <p> {notes.map(rates => <p> {rates} </p>)} </p>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}
*/
export default App
