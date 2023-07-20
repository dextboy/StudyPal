import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../supabase/client";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("user_id", user?.id);

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

  const handleSelect = async (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter event name");

    if (eventNamePrompt) {
      const { data, error } = await supabase.from("events").insert([
        {
          start: start.toISOString(),
          end: end.toISOString(),
          title: eventNamePrompt,
          user_id: user?.id,
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
        fetchEvents();
      }
    }
  };

  const handleEventDelete = async (info) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const eventId = info.event.id;
      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) {
        console.log("Error deleting event:", error.message);
      } else {
        // Delay the fetch operation by 500 milliseconds (adjust as needed)
        setTimeout(() => {
          fetchEvents();
        }, 500);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <FullCalendar
      editable
      selectable
      events={events}
      select={handleSelect}
      eventClick={handleEventDelete}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: "prev,today,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      }}
      height="60vh"
      dayMaxEventRows={3}
      dayPopoverFormat={{ month: "short", day: "numeric", year: "numeric" }}
    />
  );
};

export default Calendar;
