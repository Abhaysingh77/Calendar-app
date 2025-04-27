import { useState } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventFormModal from "./EventFormModal";
import eventsData from "../data/events.json";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState(eventsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <CalendarHeader
          currentDate={currentDate}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          + Add Event
        </button>
      </div>

      <CalendarGrid currentDate={currentDate} events={events} />

      {isModalOpen && (
        <EventFormModal
          onClose={() => setIsModalOpen(false)}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
