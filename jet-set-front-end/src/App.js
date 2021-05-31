import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CityWrapper } from "./components/CityWrapper";
import { NavBar } from "./components/NavBar";
import "./App.css";

const useStyles = makeStyles(() => {
  return {
    nav: {
      position: "relative",
      zIndex: 10,
    },
    wrapper: {
      position: "relative",
      zIndex: 0,
    },
  };
});

function App() {
  const classes = useStyles();
  const [cityList, setCityList] = useState([]);

  const handleNewCity = (newCity) => {
    console.log("Adding new city", newCity);
    if (
      cityList.find(({ name, state }) => {
        return name === newCity.name && state === newCity.state;
      })
    )
      return;
    console.log(newCity);
    setCityList([...cityList, newCity]);
  };
  return (
    <>
      <NavBar className={classes.nav} handleNewCity={handleNewCity} />
      <CityWrapper
        className={classes.wrapper}
        cityList={cityList}
      ></CityWrapper>
    </>
  );
}

export default App;
