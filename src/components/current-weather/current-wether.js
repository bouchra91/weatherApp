import '../current-weather/current-weather.css';
import { useState } from 'react';

const CurrentWeather = () => {
  return (
    <div className="current-weather">
      <div className='top'>
        
  
     <p className='city'>Paris</p>
     <p className='weather-descriotion'>Sunny</p>
</div>
<img alt='weather' className='weather-icon' src='' />
    </div>
  );
};

  export default CurrentWeather;