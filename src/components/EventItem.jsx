const EventItem = ({ event }) => {
    return (
      <div className="bg-blue-200 text-blue-800 text-xs rounded p-1">
        {event.title}
      </div>
    );
  };
  
  export default EventItem;
  