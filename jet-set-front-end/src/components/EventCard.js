import { makeStyles } from "@material-ui/core/styles";
import CardActions from '@material-ui/core/CardActions';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => {
  let backgroundColor = "beige";
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: 300,
      minWidth: 250,
      maxWidth: 1200,
      padding: 10,
      margin: 20,
      backgroundColor: backgroundColor,
      [theme.breakpoints.down(768)]: {
        maxWidth: 300
      }
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

function formatDate(inputDate) {
  var date = new Date(inputDate);
  if(!isNaN(date.getTime())) {
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }
}

function displayEvent(string) {
  if(isNaN(string)) {
    return 'Event notice: ';
  }
  else {
    return;
  }
}

export function EventCard(props) {
  const { event } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root} id="event-card">
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
          <Typography className="eventP" color="textSecondary">
            <span id="event-notice">{displayEvent(event.info)}</span> {event.info}
          </Typography>
        </CardContent>
        <div id="ticketDiv">
          <CardActions className="ticketButton">
            <a href={event.url}  className="findTickets" rel="noreferrer" target="_blank">
              <Button size="small">Find Tickets</Button>
            </a>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
