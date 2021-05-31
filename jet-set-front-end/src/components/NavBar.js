import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import { makeStyles, createStyles } from "@material-ui/core/styles";

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
  const {handleNewCity} = props;
  const [autocompleteList, setAutocompleteList] = useState([]);
  // const [data, setData] = useState([]);

  const onChange = (_, input_string) => {
    console.log("input string", input_string);
    fetch(`http://localhost:4000/cityInfo?input=${input_string}`)
      .then((response) => response.json())
      .then((body) => {
        console.log("cityObject", body);
        return handleNewCity(body)
      })
      .catch((err) => console.log(err));
  };

  const onInputChange = (_, input_string) => {
    fetch(`http://localhost:4000/autocomplete?input=${input_string}`)
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
        id="navbar"
        freeSolo={true}
        onInputChange={onInputChange}
        onChange={onChange}
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
