import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Forecast from "./Forecast";

function WeatherPage() {
  const [weatherdata, setweatherdata] = useState(null);
  const [wIcon, setwIcon] = useState("");
  const [wimg, setwimg] = useState("");
  const [date, setdate] = useState("");

  const { cityname } = useParams();
  useEffect(() => {
    const fetchweatherdata = async () => {
      try {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${
              import.meta.env.VITE_API_KEY
            }`
          )
          .then((res) => {
            setweatherdata(res.data);
          });
      } catch (error) {}
    };
    fetchweatherdata();
  }, []);

  useEffect(() => {
    if (weatherdata && weatherdata.weather) {
      const weatherIcon = weatherdata.weather[0].main;
      if (weatherIcon === "Clouds") {
        setwIcon("cloudy");
        setwimg("cloudy");
      } else if (weatherIcon === "Rain") {
        setwIcon("rainy");
        setwimg("rainy");
      } else if (weatherIcon === "Clear") {
        setwIcon("sunny");
        setwimg("sunny");
      }
    }
    const date = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      GMT: "numeric",
    };
    setdate(date.toLocaleString("en-Us", options));
    // console.log(date);
  }, [weatherdata]);

  // console.log(weatherdata);

  return (
    <div className="">
      {weatherdata && (
        <div
          className="min-h-screen flex items-center flex-col sm:flex-row  justify-center gap-5"
          style={{
            backgroundImage: `url("../images/${wimg}.jpg")`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
            <div className="font-bold text-xl">{weatherdata.name}</div>
            <div className="text-sm text-gray-500">{date}</div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              <img src={`../icons/${wIcon}.png`} alt="" />
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl">
                {(weatherdata.main.temp - 273.15).toFixed(0)}°C
              </div>
              <div className="flex flex-col items-center ml-6">
                <div>{weatherdata.weather[0].description}</div>
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up"></i>
                  </span>
                  <span className="text-sm font-light text-gray-500">
                    max-{(weatherdata.main.temp_max - 273).toFixed(0)}°C
                  </span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down"></i>
                  </span>
                  <span className="text-sm font-light text-gray-500">
                    min-{(weatherdata.main.temp_min - 273).toFixed(0)}°C
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm text-gray-500">
                  {weatherdata.wind.speed}k/h
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">
                  {weatherdata.main.humidity}%
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Presssure</div>
                <div className="text-sm text-gray-500">
                  {weatherdata.main.pressure}
                </div>
              </div>
            </div>
          </div>
          <Forecast />
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
