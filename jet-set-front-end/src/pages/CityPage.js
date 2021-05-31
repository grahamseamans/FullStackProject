import { makeStyles } from "@material-ui/core/styles";
import { CityCard } from "../components/CityCard";
// import { NavBar } from "../components/NavBar";
import { useCityContext } from "../components/CityContext";
import { useParams } from "react-router-dom";

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

export function CityPage(props) {
  let { cityIdString } = useParams();
  const { getCityFromUrl } = useCityContext();
  const city = getCityFromUrl(cityIdString);
  //   const classes = useStyles();
  return (
    <>
      {/* <NavBar className={classes.nav}/> */}
      <CityCard city={city}></CityCard>
    </>
  );
}
