import { EventCard } from "./EventCard";

export function EventCardWrapper(props) {
  const { events } = props;
  const eventList = events.events || [];
  return (
    <div className={`main-flexbox `}>
      {eventList.map((event) => {
        return <EventCard key={event.url} event={event}></EventCard>;
      })}
    </div>
  );
}
