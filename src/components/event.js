import { useDispatch } from "react-redux";
import { setModalIsOpen } from "../features/modal/modalSlice";
import { setActiveEvent } from "../features/event/eventSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Event({ eventData }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [organizer, setOrganizer] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    const savedOrganizer = JSON.parse(localStorage.getItem("organizer"));
    if (savedOrganizer) {
      setOrganizer(savedOrganizer);
    }
  }, []);

  function registerForEvent() {
    if (user && user.name) {
      dispatch(setModalIsOpen(true));
      dispatch(setActiveEvent(eventData));
    } else if (organizer && organizer.name) {
      alert("Organizer cannot register for event!");
    } else {
      alert("Please login first!");
    }
  }
    
  return (
    <div className="bg-black text-white rounded p-4">
      <Link to={`/events/${eventData.id}`}>
        <img 
          src={eventData.poster} 
          className="mb-4 w-full object-cover" 
          style={{ width: '1000px', height: '200px' }}
        />
      </Link>
      <div className="flex flex-col items-center md:flex-row md:items-center justify-between">
        <Link to={`/events/${eventData.id}`}>
          <h3 className="text-xl font-semibold mb-2 md:mb-0 md:mr-4 text-center md:text-left">
            {eventData.eventName}
          </h3>
        </Link>
        <button
          onClick={() => registerForEvent()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
