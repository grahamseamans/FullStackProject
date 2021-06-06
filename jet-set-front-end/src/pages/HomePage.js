import { makeStyles } from "@material-ui/core/styles";
import { CityWrapper } from "../components/CityWrapper";
import { NavBar } from "../components/NavBar";

const useStyles = makeStyles(() => {
  return {
    mainDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
     alignItems: "center"
    },
    nav: {
      position: "relative",
      display: "flex",
      zIndex: 10,
      width: "100%",
    },
    wrapper: {
      position: "relative",
      zIndex: 0,
    },
  };
});

export function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.mainDiv}>
      <NavBar className={classes.nav}/>
      <CityWrapper
        className={classes.wrapper}
      ></CityWrapper>
    </div>
  );
}
