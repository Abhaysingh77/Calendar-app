import { useState } from "react";
import dayjs from "dayjs";
import CalendarGrid from "./CalendarGrid";
import EventFormModal from "./EventFormModal";
import eventsData from "../data/events.json";
import EventInfoModal from "./EventInfoModal";
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState(eventsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // New: for editing
  const [infoModalEvent, setInfoModalEvent] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleAddEvent = (newEvent) => {
    if (selectedEvent) {
      // Update only the selected event
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id
            ? { ...e, title: newEvent.title, date: newEvent.date }
            : e
        )
      );
    } else {
      // Add new event
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto bg-[#f0f0f3] rounded-3xl shadow-inner p-2 sm:p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {currentDate.format("MMMM YYYY")}
        </h1>
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
          onClick={() => {
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
          className="mt-4 px-6 py-2 bg-green-400 text-white rounded-full shadow-lg hover:bg-green-500"
        >
          + Add Event
        </button>
      </div>

      {/* Calendar + Side Panel */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="flex-1 overflow-x-auto">
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onEventClick={(event) => setInfoModalEvent(event)}
          />
        </div>

        {/* Side Panel */}
        <div className="md:w-72 bg-white rounded-xl shadow-md p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">All Events</h2>
          <div className="space-y-3">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEditEvent(event)}
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded p-2"
                >
                  <div className="text-sm font-bold">{event.title}</div>
                  <div className="text-xs text-gray-500">
                    {dayjs(event.date).format("DD MMM YYYY")}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400">No events</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EventFormModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          onAddEvent={handleAddEvent}
          eventData={selectedEvent} 
        />
      )}

      {infoModalEvent && (
        <EventInfoModal
          event={infoModalEvent}
          onClose={() => setInfoModalEvent(null)}
          onEdit={handleEditEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
