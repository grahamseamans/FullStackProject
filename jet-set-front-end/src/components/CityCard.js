import { CityGraphics } from "./CityGraphics";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => {
  let backgroundColor = "beige";
  return {
    root: {
      display: "flex",
      flexDirection: "row",
      minHeight: 300,
      padding: 10,
      margin: 20,
      backgroundColor: backgroundColor,
    },
    details: {
      color: "black",
      textShadow: `-1px -1px 0 ${backgroundColor}, 1px -1px 0 ${backgroundColor}, -1px 1px 0 ${backgroundColor}, 1px 1px 0 ${backgroundColor}`,
      position: "absolute",
      zIndex: 100,
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
  const classes = useStyles();

  const {city} = props;
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardActions>
          <Button> {city.name}</Button>
        </CardActions>
        <CardContent>
          <Typography color="textSecondary">{city.state}, {city.country}</Typography>
          {/* <Typography color="textSecondary">Wind: {city.country}</Typography> */}
          <Typography variant="h5" component="h2">
            Weather
          </Typography>
          <Typography color="textSecondary">Temp: {city.weather.main.feels_like}</Typography>
          <Typography color="textSecondary">Wind: {city.weather.wind.speed}</Typography>
        </CardContent>
      </div>
      <div className={classes.graphics}>
        <CityGraphics city={city}></CityGraphics>
      </div>
    </Card>
  );
}
