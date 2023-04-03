// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=c3c0893220a246f41f919ab779cd521b

import React, {useState, useEffect} from 'react';
import WeatherCard from './weatherCard';
import "./style.css"

const Temp = () => {

  const [searchValue , setSearchValue] = useState("Mumbai");
  const[tempInfo, setTempInfo] = useState({})

  const getWeatherInfo = async () => {
try{
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;


  const res = await fetch (url);
  const data = await res.json();

  const {temp, humidity, pressure} = data.main;
  const {main : weathermood} = data.weather[0];
  const{name} = data;
  const {speed} = data.wind;
  const{country, sunset} = data.sys;

const myNewWeatherInfo = {
  temp, humidity,pressure,weathermood,name,speed,country,sunset,
};
  // console.log(temp);
  setTempInfo(myNewWeatherInfo);
} catch(error){
  console.log(error);
}
  }

    useEffect(() => {
      getWeatherInfo();   
    }, [])
    

  

  return (
    <>
    <div className='wrap'>
    <div className="search">
    <input type="search" placeholder='search...'
        id='search'
        autoFocus
        className='searchTerm'
        value={ searchValue }
        onChange={(e) => setSearchValue(e.target.value)}
    />
    <button className='searchButton' type='button' onClick={getWeatherInfo}>


    </button>
    </div>
    </div>
      <WeatherCard tempInfo={tempInfo}/>
  
</>
  )
}


export default Temp