import { CityGraphics } from "./CityGraphics";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { useCityContext } from "../components/CityContext";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => {
  let backgroundColor = "beige";
  return {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      minHeight: 300,
      padding: 10,
      margin: 20,
      backgroundColor: backgroundColor,
    },
    details: {
      position: "absolute",
      zIndex: 2,
      color: "black",
      textShadow: `-1px -1px 0 ${backgroundColor}, 1px -1px 0 ${backgroundColor}, -1px 1px 0 ${backgroundColor}, 1px 1px 0 ${backgroundColor}`,
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    graphics: {
      position: "relative",
      flex: 1,
    },
  };
});

export function CityCard(props) {
  console.log("cityCard rendering")
  const { city } = props;
  const history = useHistory();
  const classes = useStyles();
  const { getCityUrl } = useCityContext();

  const onClickRoute = () => history.push(getCityUrl(city));

  let locDesc = "";
  if (city.state) {
    locDesc = city.state + ", " + city.country;
  } else {
    locDesc = city.country;
  }

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardActions>
          <Button onClick={onClickRoute}>{city.name}</Button>
        </CardActions>
        <CardContent>
          <Typography color="textSecondary">{locDesc}</Typography>
          <Typography variant="h5" component="h2">
            Weather
          </Typography>
          <Typography color="textSecondary">
            Temp: {city.weather.main.feels_like}
          </Typography>
          <Typography color="textSecondary">
            Wind: {city.weather.wind.speed}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.graphics}>
        <CityGraphics city={city}></CityGraphics>
      </div>
    </Card>
  );
}
