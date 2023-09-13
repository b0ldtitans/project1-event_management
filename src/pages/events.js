import EventInfo from "../components/eventInfo";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect } from "react";

function Events() {

    useEffect(() => {
        document.title = "Event";
    }, []);

    return (
        <div>
        <Navbar title={"Event"} />
        <EventInfo />
        <Footer />
        </div>
    );
    }

export default Events;