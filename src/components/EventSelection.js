import React from "react";
import { useNavigate } from "react-router-dom";

const events = [
  { id: 1, day: "Day 1", name: "Hacker Check-in" },
  { id: 1, day: "Day 1", name: "Dinner" },
  { id: 2, day: "Day 2", name: "Breakfast" },
  { id: 3, day: "Day 2", name: "Lunch" },
  { id: 4, day: "Day 2", name: "Dinner" },
  { id: 5, day: "Day 3", name: "Breakfast" },
];

function EventSelection() {
  const navigate = useNavigate();

  const handleEventClick = (eventId, eventName, eventDay) => {
    console.log(eventId)
    navigate(`/scanner/${eventId}/${eventName}/${eventDay}`);
  };

  return (
    <div className="font-[Faustina] bg-[#EDDEC9] select-none w-full h-screen">
      <h1 className="text-4xl font-['Faustina'] font-bold text-[#555F49] pt-12 mb-12">ElleHacks Check-in</h1>

      <div className="grid grid-cols-1 gap-3 justify-items-center place-items-center">
        {events.map((event, index) => (
          <div key={index} className="event w-100">
            {index === 0 || events[index - 1].day !== event.day ? (
              <h2 className="event-day">{event.day}</h2>
            ) : null}

            <button className="w-60 bg-[#555F49] font-['Faustina'] text-white text-lg py-2 px-4 rounded-3xl hover:bg-[#D8AA6C]" onClick={() => handleEventClick(event.id, event.name, event.day)}>
              {event.name}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default EventSelection;
