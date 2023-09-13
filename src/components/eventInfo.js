import api from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalIsOpen } from "../features/modal/modalSlice";  
import { setActiveEvent } from "../features/event/eventSlice";
import Register from "./registerModal";
import Referral from "./referralModal";
import ModalComponent from "./modal";

function EventInfo() {
    const [eventData, setEventData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [organizer, setOrganizer] = useState({});
    const dispatch = useDispatch();
    const { id } = useParams();
    const modalContent = useSelector((state) => state.modal.content);

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
  
    useEffect(() => {
      api
        .get(`/events/${id}`)
        .then((response) => {
          const eventData = response.data;
          setEventData(eventData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    }, [id]);
    
    if (!eventData) {
      return <div>Loading...</div>;
    }

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
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:max-w-xs flex items-center">
            <img className="h-auto w-full object-contain mx-auto" src={eventData.poster} alt={eventData.eventName} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{eventData.category.charAt(0).toUpperCase() + eventData.category.slice(1)}</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{eventData.eventName}</h1>
            <p className="mt-2 text-gray-500">{eventData.date} | {eventData.time}</p>
            <p className="mt-2 text-gray-500">{eventData.location} | {eventData.venue}</p>
            <p className="mt-2 text-gray-500">Ticket Price: {eventData.ticketPrice}</p>
            <p className="mt-2 text-gray-500">Max Attendees: {eventData.maxAttendees}</p>
            <p className="mt-2 text-gray-500">{eventData.description}</p>
            <button
              onClick={() => registerForEvent()}
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
            <ModalComponent className="mt-4">
              {modalContent === "register" ? <Register /> : <Referral />}
            </ModalComponent>
          </div>
        </div>
      </div>
    );        
  }
  
  export default EventInfo;   