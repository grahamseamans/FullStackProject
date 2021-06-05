import { useEffect, useState, useRef } from "react";
import { CityCard } from "../components/CityCard";
import { useCityContext } from "../components/CityContext";
import { useParams, Link } from "react-router-dom";
import { EventCardWrapper } from "../components/EventCardsWrapper";
import { MultiDayWeatherWrapper } from "../components/MultiDayWeatherWrapper";
import { eventsFromCity, multiDayWeatherFromCity } from "../components/Utils";

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
      <Link className="back-button" to="/"><span>&#8592;</span></Link>
      {city && eventsSet.current && weatherSet.current && (
        <CityCard city={city} />
      )}
      <MultiDayWeatherWrapper multiWeather={multiWeater_temp} />
      <EventCardWrapper events={events} />
    </>
  );
}
