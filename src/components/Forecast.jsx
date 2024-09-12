import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Forecast() {
  const [forecastdata, setforecastdata] = useState([]);
  const [loading, setloading] = useState(true);
  const { cityname } = useParams();
  useEffect(() => {
    const fetchforecastdata = async () => {
      try {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${
              import.meta.env.VITE_API_KEY
            }`
          )
          .then((res) => {
            const dailyforecast = res.data.list.filter(
              (item, index) => index % 8 === 0
            );
            setforecastdata(dailyforecast);
            setloading(false);
            // console.log(forecastdata.length);
          });
      } catch (error) {}
    };
    fetchforecastdata();
  }, [cityname]);

  return (
    <div>
      <h1 className=" text-center font-extrabold mb-2 text-[20px]">Forecast</h1>
      {loading ? (
        <p>Loading..</p>
      ) : (
        <div>
          {forecastdata.map((day, index) => {
            let weatherIcon;
            if (day.weather[0].main === "Clouds") {
              weatherIcon = "cloudy";
            } else if (day.weather[0].main === "Rain") {
              weatherIcon = "rainy";
            } else if (day.weather[0].main === "Clear") {
              weatherIcon = "sunny";
            }
            // Date forcast
            const date = new Date(day.dt_txt);
            const forcastdate = date.toLocaleDateString("en-Us", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              GMT: "numeric",
            });
            return (
              <div key={index} className=" text-center font-semibold ">
                <p>
                  <span className=" ">{forcastdate}</span>
                </p>
                <div className=" flex gap-2 text-center justify-center ">
                  <p className=" ">{weatherIcon} ➡️</p>
                  <img
                    src={`../icons/${weatherIcon}.png`}
                    alt=""
                    className="w-[30px]"
                  />
                </div>
                <p className=" mb-2">
                  <span className=" ">
                    {(day.main.temp - 273.15).toFixed(0)}°C{" "}
                  </span>{" "}
                </p>
                {/* <br /> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Forecast;
