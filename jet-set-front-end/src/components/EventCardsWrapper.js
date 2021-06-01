import { EventCard } from "./EventCard";

export function EventCardWrapper(props) {
  const { events } = props;
  console.log("events in EventCardWrapper", events)
  const eventList = events.events || []
  console.log("eventList in EventCardWrapper", eventList)
    return (
      <div className={`main-flexbox `}>
        {eventList.map((event) => (
          <EventCard
            key={event.url}
            event={event}
          ></EventCard>
        ))}
      </div>
    );
  }