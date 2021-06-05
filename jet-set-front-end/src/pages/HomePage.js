import { makeStyles } from "@material-ui/core/styles";
import { CityWrapper } from "../components/CityWrapper";
import { NavBar } from "../components/NavBar";

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

export function HomePage() {
  console.log("in the HomePage");
  const classes = useStyles();
  return (
    <>
      <NavBar className={classes.nav} />
      <CityWrapper className={classes.wrapper}></CityWrapper>
    </>
  );
}
