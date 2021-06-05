import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function formatDate(inputDate) {
  var date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }
}

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
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    secondColumn: {
      flex: 1,
    },
  };
});

export function EventCard(props) {
  const { event } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent>
          <Typography variant="h5" color="textPrimary">
            {event.name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {event.venue_name}
          </Typography>
          <Typography color="textSecondary">
            {formatDate(event.date)}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.secondColumn}>
        <Typography color="textSecondary">
          <span id="event-notice">Event notice: </span>{event.info}
        </Typography>
      </div>
    </Card>
  );
}
