import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CreateEventComponent from "../components/create-event";

const CreateEventPage = () => {
    return (
        <div>
        <Navbar title={"Create Event"}/>
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Create Event</h1>
            <CreateEventComponent />
        </div>
        <Footer />
        </div>
    );
    }

export default CreateEventPage;