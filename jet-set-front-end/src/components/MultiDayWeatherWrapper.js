import { ForecastDisp } from "./ForecastDisp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return {
    header: {
      textAlign: "center",
    },
  };
});

export function MultiDayWeatherWrapper(props) {
  const classes = useStyles();
  const { multiWeather } = props;
  const multiWeatherList = multiWeather?.list?.slice(0, 7) || [];
  return (
    <>
      <Typography variant="h5" className={classes.header}>
        7 Day Weather Forecast
      </Typography>
      <div className={`main-flexbox `}>
        {multiWeatherList.map((day) => (
          <ForecastDisp key={day.dt} day={day} />
        ))}
      </div>
    </>
  );
}
