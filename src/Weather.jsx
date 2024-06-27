import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');


    const fetchWeather = async () => {
        try {
            // Get location key from city name
            const locationResponse = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search`, {
                params: {
                    apikey: import.meta.env.VITE_ACCUWEATHER_API_KEY,
                    q: city,
                },
            });

            if (locationResponse.data.length === 0) {
                setError('City not found');
                setWeather(null);
                return;
            }

            const locationKey = locationResponse.data[0].Key;
            const cityName = locationResponse.data[0].LocalizedName;

            // Get weather data using location key
            const weatherResponse = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, {
                params: {
                    apikey: import.meta.env.VITE_ACCUWEATHER_API_KEY,
                    details: true,
                },
            });

            const weatherData = weatherResponse.data[0];

            // console.log(weatherData);

            const result = {
                cityName,
                temperature: weatherData.Temperature?.Metric?.Value,
                humidity: weatherData.RelativeHumidity,
                wt: weatherData.WeatherText,
                desuvindex: weatherData.UVIndexText,
                desvisibility: weatherData.Visibility?.Metric?.Value,
                // deswind: weatherData.Wind?.Speed?.Metric?.Value,
                descloudcover: weatherData.CloudCover,
                despressure: weatherData.Pressure?.Metric?.Value,
                desrealfeel: weatherData.RealFeelTemperature?.Metric?.Value,
                descieling: weatherData.Ceiling?.Metric?.Value,
            };

            setWeather(result);
            setError('');
        } catch (err) {
            console.error('Error Fetching Weather data',err);
            setError('Error fetching weather data');
            setWeather(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
            <h1 className="text-5xl font-bold text-white mb-6 animate-bounce">Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-3 border border-gray-300 rounded mb-4 text-black bg-white"
            />
            <button
                onClick={fetchWeather}
                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-700 transition transform hover:scale-110"
            >
                Fetch Weather
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {weather && (
                <div className="mt-4 text-center text-white">
                    <h2 className="text-3xl font-bold">{weather.cityName}</h2>
                    <p className="text-2xl">Temperature: {weather.temperature} °C</p>
                    <p className="text-2xl">Humidity: {weather.humidity} %</p>
                    <p className="description">
                        Description :--- 
                        <p className="h-[1px] bg-white"></p>
                        <p className="text-2xl">Condition: {weather.wt}</p>
                        <p className="text-2xl">UVIndex: {weather.desuvindex}</p>
                        <p className="text-2xl">Visibility: {weather.desvisibility} Km</p>
                        {/* <p className="text-2xl">Wind: {weather.deswind}</p> */}
                        <p className="text-2xl">Cloud Cover: {weather.descloudcover}</p>
                        <p className="text-2xl">Pressure: {weather.despressure} mb</p>
                        <p className="text-2xl">Real Feel Temp: {weather.desrealfeel} C</p>
                        <p className="text-2xl">Ceiling: {weather.descieling} Km</p>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Weather;
