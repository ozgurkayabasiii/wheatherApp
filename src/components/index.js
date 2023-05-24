import React, { useEffect, useState } from "react";
import { getWeahter } from "../redux/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/tr";
import './style.css'

function Main() {
  const [country, setCountry] = useState("Adana");
  const dispatch = useDispatch();
  const items = useSelector((state) =>
    state.weather.items.filter((item, index) =>
      [0, 8, 16, 24, 32].includes(index)
    )
  );
  const status = useSelector((state) => state.weather.status);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getWeahter(country));
    
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(getWeahter(country));
    }
  }, [status]);
  if (status === "failed") {
    return <div>Failed</div>;
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    
      <div className="container ">
        <div style={{marginTop:'15%',marginBottom:'5%'}}>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Şehir ismi giriniz"
            ></input>
            <button type="submit">Gönder</button>
          </form>
        </div>
        <div className="container">
          <div className="item ">
            {items.map((item, index) => {
              return (
                <div key={index} >
                  <h3>{moment(item.dt_txt).format("dddd")}</h3>
                  <p>{parseInt(item.main.temp)} °C</p>
                  <p>{item.weather[0].description}</p>
                  <img
                    alt="icon"
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    
  );
}

export default Main;
