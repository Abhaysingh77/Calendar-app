import dayjs from "dayjs";

const CalendarGrid = ({ currentDate, events }) => {
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days = [];
  let day = startDate;

  while (day.isBefore(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const getEventsForDay = (day) => {
    return events.filter((event) => dayjs(event.date).isSame(day, "day"));
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day, index) => {
        const isToday = day.isSame(dayjs(), "day");
        const dayEvents = getEventsForDay(day);

        return (
          <div
            key={index}
            className={`h-28 border rounded p-2 overflow-hidden ${
              isToday ? "bg-[#0088ff] text-white" : "bg-white"
            }`}
          >
            <div className="font-bold">{day.date()}</div>
            <div className="space-y-1 mt-1">
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="text-xs truncate bg-gray-200 rounded px-1 py-0.5 text-black"
                >
                  {event.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
