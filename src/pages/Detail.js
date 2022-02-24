import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Arrow from "../assets/arrow-left-solid.svg";
function Detail() {
  const location = useParams();
  const path = location.nameId;

  const [borderData, setBorderData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v2/name/${path}?fields=name,nativeName,population,region,subregion,capital,flags,topLevelDomain,currencies,languages,borders`
      )
      .then((response) => {
        setData(response.data);
        console.log("hallowelt" + JSON.stringify(response.data));
        const borderArray = response.data[0].borders;
        axios
          .get(`https://restcountries.com/v3.1/alpha?codes=${borderArray}`)
          .then((response) => {
            setBorderData(response.data);
            console.log("first" + JSON.stringify(response.data[0].borders));
          });
        console.log("test1" + JSON.stringify(response.data));
      });
  }, [path]);

  useEffect(() => {}, [data[0]]);

  return (
    <div className="detail">
      <Link className="remove-deco" to="/">
        <button>
          <img src={Arrow} alt="Arrow" />
          Back
        </button>
      </Link>
      {data[0] && (
        <div className="detail-body">
          <img src={data[0].flags.svg} alt="country-flag" />
          <div className="detail-body-text">
            <div className="detail-body-control">
              <div className="main-detail-text">
                <h2>{data[0].name}</h2>
                <h5>
                  <b>Native Name: </b> {data[0].nativeName}
                </h5>
                <h5>
                  <b>Population: </b>
                  {data[0].population
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </h5>
                <h5>
                  <b>Region: </b>
                  {data[0].region}
                </h5>
                <h5>
                  <b>Sub Region: </b> {data[0].subregion}
                </h5>
                <h5>
                  <b>Capital: </b> {data[0].capital}
                </h5>
              </div>
              <div className="side-detail-text">
                <h5>
                  <b>Top Level Domain: </b> {data[0].topLevelDomain}
                </h5>
                <h5>
                  <b>Currencies: </b> {data[0].currencies[0].name}
                </h5>
                <h5>
                  <b>Languages: </b> {data[0].languages[0].name}
                </h5>
              </div>
            </div>
            <div className="border-countries">
              Border Countries:{" "}
              {borderData &&
                borderData.map((borderCountry) => {
                  return (
                    <div key={borderCountry.name.common}>
                      {borderCountry.name.common}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
