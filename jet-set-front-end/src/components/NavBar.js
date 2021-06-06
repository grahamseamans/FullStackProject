import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useCityContext } from "./CityContext";

const fetch = require("node-fetch");

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        border: "2px grey",
        minHeight: 200,
      },
      NavBar: {
        width: 350,
        margin: 20,
      },
    },
  })
);

const CustomPopper = function (props) {
  const classes = useStyles();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

export function NavBar(props) {
  const { stringToNewCity, handleNewCity } = useCityContext();
  const [autocompleteList, setAutocompleteList] = useState([]);
  // const classes = useStyles();

  const onChange = async (_, input_string) => {
    if (!input_string) return;
    const newCity = await stringToNewCity(input_string);
    handleNewCity(newCity);
    return newCity;
  };

  const onInputChange = (_, input_string) => {
    fetch(`/autocomplete?input=${input_string}`)
      .then((response) => response.json())
      .then((body) => {
        setAutocompleteList(body);
      })
      .catch((err) => console.log(err));
  };

  return (
    // <>
    <Autocomplete
      props
      id="navbar"
      freeSolo={true}
      onChange={onChange}
      onInputChange={onInputChange}
      options={autocompleteList}
      style={{ maxWidth: 325, margin: 20, width: "100%" }}
      renderInput={(params) => {
        return (
          <TextField {...params} variant="outlined" label="Search a city..." />
        );
      }}
      PopperComponent={CustomPopper}
    />
    // </>
  );
}
