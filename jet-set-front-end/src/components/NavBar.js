import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const fetch = require('node-fetch');

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        border: "2px grey",
        minHeight: 200,
        "& li:nth-child(even)": { backgroundColor: "#CCC" },
        "& li:nth-child(odd)": { backgroundColor: "#FFF" }
      }
    }
  })
);

const CustomPopper = function (props) {
  const classes = useStyles();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

export function NavBar(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("")
    //   .then((response) => response.json())
    //   .then((data) => setData(data));
    setData(props);
  });

  return (
    <>
      <Autocomplete
        id="navbar"
        options={data.cityList}
        style={{ width: 350, margin: 20 }}
        getOptionLabel={(option) => `${option.name}`} //filter value
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="outlined"
              label="Search a city..."
            />
          );
        }}
        renderOption={(option) => {
          return <h4>{`${option.name}: ${option.manufacturer}`}</h4>; //display value
        }}
        PopperComponent={CustomPopper} //required (as far as I can tell) in order to target popper elements for custom styling
      />
    </>
  );
}