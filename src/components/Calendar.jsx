import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../supabase/client";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  const handleSelect = async (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter event name");

    if (eventNamePrompt) {
      const { data, error } = await supabase.from("events").insert([
        {
          start: start.toISOString(),
          end: end.toISOString(),
          title: eventNamePrompt,
          user_id: user?.id, // Replace with the actual user ID
        },
      ]);

      if (error) {
        console.log("Error saving event:", error.message);
      } else {
        setEvents([
          ...events,
          {
            start: start.toISOString(),
            end: end.toISOString(),
            title: eventNamePrompt,
            user_id: user?.id,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", user?.id); // Replace with the actual user ID

      if (data) {
        const formattedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      }

      if (error) {
        console.log("Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <FullCalendar
        editable
        selectable
        events={events}
        select={handleSelect}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="100vh"
      />
    </div>
  );
};

export default Calendar;
