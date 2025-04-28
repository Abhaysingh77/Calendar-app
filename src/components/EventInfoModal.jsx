const EventInfoModal = ({ event, onClose, onEdit }) => {
    if (!event) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-80">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-2 mb-4">
            <div><span className="font-bold">Title:</span> {event.title}</div>
            <div><span className="font-bold">Date:</span> {event.date}</div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              onClick={() => {
                onEdit(event);
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EventInfoModal;
  