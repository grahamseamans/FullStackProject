import { makeStyles } from "@material-ui/core/styles";
import { colorsFromTemp, kelvinToFarenheit} from "./Utils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(() => {
  return {
    root: (props) => ({
      display: "flex",
      flexDirection: "row",
      borderRadius: 5,
      margin: 2,
      backgroundColor: props.backgroundColor,
    }),
  };
});

export function ForecastDisp(props) {
  const { day } = props;

  const temperature = kelvinToFarenheit(day.main.feels_like)

  console.log("temp in forecast disp", temperature)
  const color = colorsFromTemp(temperature);
  const classes = useStyles({ backgroundColor: color });


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary">Temp: {temperature}</Typography>
      </CardContent>
    </Card>
  )
}