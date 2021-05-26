import { CityGraphics } from "./CityGraphics";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minWidth: 500,
    height: 300,
    padding: 10,
    margin: 20,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
    graphics: {
      width: "auto",
  }
});

export function CityCard(props) {
  const classes = useStyles();

  const { name, temperature, wind } = props;
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardActions>
          <Button size="large"> {name}</Button>
        </CardActions>
        <Typography variant="h5" component="h2">
          Temp: {temperature}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Wind: {wind}
        </Typography>
      </div>
      <div className={classes.graphics}>
        <CityGraphics temperature={temperature} wind={wind}></CityGraphics>
      </div>
    </Card>
  );
}
