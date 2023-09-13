import React, { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function EventsTable() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [organizer, setOrganizer] = useState({});
    const [filterEvents, setFilterEvents] = useState([]);

    useEffect(() => {
        const savedOrganizer = JSON.parse(localStorage.getItem("organizer"));
        if (savedOrganizer) {
            setOrganizer(savedOrganizer);
        }
    }, []);
    
    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const events = await api.get("/events");
            setEvents(events.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };
    
        fetchEvents();
    }, []);

    useEffect(() => {
        const filteredEvents = events.filter((event) => event.organizer_id === organizer.id);
        setFilterEvents(filteredEvents);
    }, [events, organizer]);

    
    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>{error}</p>;
    }
    
    return (
		<div id='card' class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
			<table id="events" class="stripe hover" style={{width: "100%", paddingTop: "1em", paddingBottom: "1em"}}>
				<thead>
					<tr>
						<th data-priority="1">No</th>
						<th data-priority="2">Event Name</th>
						<th data-priority="3">Date</th>
						<th data-priority="4">Location</th>
					</tr>
				</thead>
				<tbody>
                    {filterEvents.map((event, index) => (
                        <tr key={event.id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/events/${event.id}`}>{event.eventName}</Link>
                            </td>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                        </tr>
                    ))}
				</tbody>
			</table>
		</div>
    );
    }
