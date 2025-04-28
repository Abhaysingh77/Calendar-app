import { useState } from "react";

const EventFormModal = ({ onClose, onAddEvent, eventData }) => {
  const [title, setTitle] = useState(eventData?.title || "");
  const [date, setDate] = useState(eventData?.date || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date) {
      onAddEvent({ ...eventData, title, date });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">
          {eventData ? "Edit Event" : "Add Event"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {eventData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EventFormModal;
