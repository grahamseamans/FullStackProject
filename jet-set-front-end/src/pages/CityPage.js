import { useEffect, useState } from "react";
import { CityCard } from "../components/CityCard";
import { useCityContext } from "../components/CityContext";
import { useParams } from "react-router-dom";
import { EventCardWrapper } from "../components/EventCardsWrapper";
import { eventsFromCity } from "../components/Utils"
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(() => {
//   return {
//     nav: {
//       position: "relative",
//       zIndex: 10,
//     },
//     wrapper: {
//       position: "relative",
//       zIndex: 0,
//     },
//   };
// });

export function CityPage(props) {
  const [events, setEvents] = useState([]);
  let { cityIdString } = useParams();
  const { getCityFromUrl } = useCityContext();
  const city = getCityFromUrl(cityIdString);

  useEffect(() => {
    const getEvents = async () => {
      const events = await eventsFromCity(city);
      setEvents(events);
    }
    getEvents();
  }, [city]);

  //   const classes = useStyles();
  return (
    <>
      <CityCard city={city}></CityCard>
      <EventCardWrapper events={events}></EventCardWrapper>
    </>
  );
}
