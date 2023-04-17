import axios from "axios";
import { useState } from "react";
import AthleteCard from "./../AthleteCard/AthleteCard";
import SearchAthlete from "@components/SearchAthlete/SearchAthlete";
import { Link } from "react-router-dom";
import "./athletelist.css";

const AthleteList = () => {
  const [persons, setPersons] = useState([]);
  const [country, setCountry] = useState("");
  const [age, setAge] = useState([0]);

  const options = {
    method: "GET",
    url: "https://api.triathlon.org/v1/athletes",
    params: { per_page: "1000", validated: "true" },
    headers: {
      accept: "application/json",
      apikey: "2649776ef9ece4c391003b521cbfce7a",
    },
  };
  const getPersons = () => {
    axios.request(options).then((response) => {
      const totalData = response.data.data;
      const filterCountry =
        country === ""
          ? totalData
          : totalData.filter(
              (athlete) => athlete.athlete_country_name === country
            );
      const filterAge =
        age[0] === 0
          ? filterCountry
          : filterCountry.filter((athlete) =>
              age.length === 1 && age[0] === 18
                ? athlete.athlete_age < age[0]
                : age.length === 1 && age[0] === 32
                ? athlete.athlete_age > 32
                : athlete.athlete_age >= age[0] && athlete.athlete_age <= age[1]
            );
      const filterImg = filterAge.filter(
        (athlete) => athlete.athlete_profile_image !== null
      );

      console.log(filterImg);
      setPersons(filterImg);
    });
  };

  const handleCountry = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    console.log("Selected country:", selectedCountry);
  };
  const handleAge = (event) => {
    const selectedAge = event.target.value;
    const ageRange = selectedAge.split(",");
    const numberAgeRange = ageRange.map((age) => parseInt(age));
    setAge(numberAgeRange);
    console.log("Selected age:", numberAgeRange);
  };
  return (
    <>
      <div class="searchathletebutton">
        <SearchAthlete handleCountry={handleCountry} handleAge={handleAge} />
        <br />
        <div>
          <button class="btn-form" onClick={getPersons}>
            Get Athlete List
          </button>
        </div>
      </div>
      <div id="athlete-list" className="row">
        {persons
          ? persons.map((athlete) => (
              <div
                key={athlete.athlete_id}
                className="col-lg-3 col-md-6 col-sm-12"
                id="fontId"
                
              >
                <Link to={`/profile/${athlete.athlete_id}`}>
                  <AthleteCard athlete={athlete} />
                </Link>
              </div>
            ))
          : null}
      </div>
    </>
  );
};
export default AthleteList;
