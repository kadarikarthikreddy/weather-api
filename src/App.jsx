import { useState } from "react";
import "./App.css";
import CitiesTable from "./components/CitiesTable";
import WeatherPage from "./components/WeatherPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CitiesTable />} />
            <Route path="/weather/:cityname" element={<WeatherPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
