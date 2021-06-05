import { makeStyles } from "@material-ui/core/styles";
import { colorsFromTemp } from "./Utils";

const useStyles = makeStyles(() => {
  return {
    root: (props) => ({
      display: "flex",
      flexDirection: "row",
      minHeight: 20,
      minWidth: 20,
      padding: 10,
      margin: 20,
      backgroundColor: props.backgroundColor,
    }),
    details: (props) => ({
      color: "black",
      textShadow: `-1px -1px 0 ${props.backgroundColor}, 1px -1px 0 ${props.backgroundColor}, -1px 1px 0 ${props.backgroundColor}, 1px 1px 0 ${props.backgroundColor}`,
      display: "flex",
      flexDirection: "column",
      flex: 1,
    }),
    secondColumn: {
      flex: 1,
    },
  };
});

export function ForecastDisp(props) {
  const { day } = props;
  const color = colorsFromTemp(day);
  const classes = useStyles({ backgroundColor: color });
  return <div className={classes.root}>
    <span>day</span>
  </div>;
}
