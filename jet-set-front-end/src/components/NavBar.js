import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { fixCity } from "./Utils";
import { useCityContext } from "./CityContext"

// const fetch = require("node-fetch");

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        border: "2px grey",
        minHeight: 200,
        // "& li:nth-child(even)": { backgroundColor: "#CCC" },
        // "& li:nth-child(odd)": { backgroundColor: "#FFF" },
      },
    },
  })
);

const CustomPopper = function (props) {
  const classes = useStyles();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

export function NavBar(props) {

  const { handleNewCity } = useCityContext();
  const [autocompleteList, setAutocompleteList] = useState([]);

  const onChange = (_, input_string) => {
    if (!input_string) return;
    console.log("input string", input_string);
    fetch(`/cityInfo?input=${input_string}`)
      .then((response) => response.json())
      .then((body) => {
        console.log("cityObject", body);
        body = fixCity(body)
        return handleNewCity(body);
      })
      .catch((err) => console.log(err));
  };

  const onInputChange = (_, input_string) => {
    fetch(`/api/autocomplete?input=${input_string}`)
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        setAutocompleteList(body);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Autocomplete
        props
        id="navbar"
        freeSolo={true}
        onChange={onChange}
        onInputChange={onInputChange}
        options={autocompleteList}
        style={{ width: 350, margin: 20 }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="outlined"
              label="Search a city..."
            />
          );
        }}
        PopperComponent={CustomPopper}
      />
    </>
  );
}
