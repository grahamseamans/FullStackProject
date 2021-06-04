import { useEffect, useState, useRef } from "react";
import { CityCard } from "../components/CityCard";
import { useCityContext } from "../components/CityContext";
import { useParams } from "react-router-dom";
import { EventCardWrapper } from "../components/EventCardsWrapper";
import { MultiDayWeatherWrapper } from "../components/MultiDayWeatherWrapper";
import { eventsFromCity, multiDayWeatherFromCity } from "../components/Utils";
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
  console.log("banana");
  const [city, setCity] = useState(null);
  const [events, setEvents] = useState([]);
  const [multiWeather, setMultiWeather] = useState([]);
  const { cityIdString } = useParams();
  const { getCityFromUrlString } = useCityContext();
  const eventsSet = useRef(false);
  const weatherSet = useRef(false);

  const multiWeater_temp = { days: [0, 20, 40, 60, 80, 100] };
  weatherSet.current = true;

  useEffect(() => {
    const getCity = async () => {
      const city = await getCityFromUrlString(cityIdString);
      setCity(city);
      console.log("called setCity");
    };
    const getEvents = async () => {
      const events = await eventsFromCity(city);
      eventsSet.current = true;
      setEvents(events);
    };
    const getMultiWeather = async () => {
      const multiWeather = await multiDayWeatherFromCity(city);
      weatherSet.current = true;
      setMultiWeather(multiWeather);
    };

    if (city) {
      getEvents();
      getMultiWeather();
    } else {
      getCity();
    }
  }, [city, cityIdString, getCityFromUrlString]);

  return (
    <>
      {city && eventsSet.current && weatherSet.current && (
        <CityCard city={city} />
      )}
      <MultiDayWeatherWrapper multiWeather={multiWeater_temp} />
      <EventCardWrapper events={events} />
    </>
  );
}
