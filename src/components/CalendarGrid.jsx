import dayjs from "dayjs";

const CalendarGrid = ({ currentDate, events, onEventClick }) => {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days = [];
  let day = startDate;

  while (day.isBefore(endDate, "day") || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const getEventsForDay = (day) => {
    return events.filter((event) => dayjs(event.date).isSame(day, "day"));
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-2">
      {/* Days of the week */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4 text-center text-gray-500 text-xs sm:text-sm font-semibold">
        {weekDays.map((dayName, idx) => (
          <div key={idx}>{dayName}</div>
        ))}
      </div>

      {/* Dates grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {days.map((day, index) => {
          const isToday = day.isSame(dayjs(), "day");
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={index}
              className={`aspect-square p-1 sm:p-3 flex flex-col justify-between rounded-xl shadow-md ${
                isToday ? "bg-[#0088ff] text-white" : "bg-white"
              }`}
            >
              <div className="text-xs sm:text-sm font-bold">{day.date()}</div>

              <div className="space-y-1 overflow-y-auto max-h-16 sm:max-h-24">
                {dayEvents.map((event, idx) => (
                  <div
                    key={idx}
                    onClick={() => onEventClick(event)}
                    className="cursor-pointer text-[10px] sm:text-xs truncate bg-gray-200 hover:bg-gray-300 rounded px-1 py-0.5 text-black"
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
