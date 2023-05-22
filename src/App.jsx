import React, { useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

import plant from "./assets/plant.png";
import therm from "./assets/therm.png";
import therm1 from "./assets/therm1.png";
import therm2 from "./assets/therm2.png";

function App() {
  const [getData, setGetData] = useState("");
  const [termo, setTermo] = useState("therm2");

  async function call() {
    const fetch = await axios.post(
      `${import.meta.env.VITE_BASE_API}/mongo/find`,
      {
        find: "one",
      }
    );
    setGetData(fetch.data);
    console.log(fetch.data);
    if (fetch.data.temp < 27) {
      setTermo(therm2);
    } else if (fetch.data.temp >= 27 && fetch.data.temp <= 32) {
      setTermo(therm1);
    } else {
      setTermo(therm);
    }
  }

  useEffect(() => {
    call();
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div className="subcontainer">
          <img src={termo} alt="termometer" />
          <p>{getData.temp}°C</p>
        </div>
        <div className="subcontainer">
          <img src={plant} alt="plant" />
          <p>{getData.tanah}%</p>
        </div>
      </div>
    </div>
  );
}

export default App;
