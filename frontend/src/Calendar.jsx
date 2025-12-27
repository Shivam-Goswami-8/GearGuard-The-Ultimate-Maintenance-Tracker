import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import API from "./api";

export default function CalendarView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/requests").then(res => {
      const preventiveEvents = res.data
        .filter(r => r.type === "Preventive" && r.scheduledDate)
        .map(r => ({
          id: r._id,
          title: `${r.subject} (${r.equipment?.name})`,
          date: r.scheduledDate
        }));

      setEvents(preventiveEvents);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Preventive Maintenance Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}
