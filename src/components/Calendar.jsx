import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { v4 as uuid } from "uuid";

function Calendar() {
  const [events, setEvents] = useState([]);
  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };
  return (
    <div>
      <Fullcalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        height={"100vh"}
      />
    </div>
  );
}

export default Calendar;