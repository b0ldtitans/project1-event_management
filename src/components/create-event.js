import React, { useEffect, useState } from 'react';
import api from '../api'; // Adjust the path if necessary

function CreateEventComponent() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventId: "",
    category: "",
    description: "",
    date: "",
    time: "",
    location: "",
    venue: "",
    ticketPrice: "",
    maxAttendees: "",
    poster: "",
    organizer_id: 0,
  });
  const [organizer, setOrganizer] = useState({});

  useEffect(() => {
    const savedOrganizer = JSON.parse(localStorage.getItem("organizer"));
    if (savedOrganizer) {
        setOrganizer(savedOrganizer);
    }
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', formData);  // Adjust the endpoint ('/events') if necessary
      alert('Event created successfully');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Event Name</label>
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Event ID</label>
          <input type="text" name="eventId" value={formData.eventId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          {/* ... (other form fields) */}
          <label className="block text-gray-700">Date</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Time</label>
          <input type="text" name="time" value={formData.time} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Venue</label>
          <input type="text" name="venue" value={formData.venue} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Ticket Price</label>
          <input type="text" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Max Attendees</label>
          <input type="text" name="maxAttendees" value={formData.maxAttendees} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Poster</label>
          <input type="text" name="poster" value={formData.poster} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          <label className="block text-gray-700">Organizer ID</label>
          <input type="number" name="organizer_id" value={formData.organizer_id} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create Event</button>
        </div>
      </form>
    </div>
  );  
}

export default CreateEventComponent;