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
    <div className="max-w-7xl mx-auto bg-[#f0f0f3] rounded-3xl shadow-inner p-4 sm:p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold mb-2">{currentDate.format("MMMM YYYY")}</h1>
        <div className="flex gap-3">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 rounded-full shadow-md bg-white hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 rounded-full shadow-md bg-white hover:bg-gray-100"
          >
            →
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-6 py-2 bg-green-400 text-white rounded-full shadow-lg hover:bg-green-500"
        >
          + Add Event
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <CalendarGrid currentDate={currentDate} events={events} />
      </div>

      {/* Modal */}
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
