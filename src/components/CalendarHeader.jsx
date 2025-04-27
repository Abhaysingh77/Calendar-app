const CalendarHeader = ({ currentDate, onPrev, onNext }) => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={onPrev} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Prev
        </button>
        <h2 className="text-2xl font-bold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={onNext} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Next
        </button>
      </div>
    );
  };
  
  export default CalendarHeader;
  