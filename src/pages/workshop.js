import { useSelector } from "react-redux";
import Event from "../components/event";
import ModalComponent from "../components/modal";
import Register from "../components/registerModal";
import Referral from "../components/referralModal";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect } from "react";

export default function Workshop() {
  const events = useSelector((state) => state.event.events);
  const modalContent = useSelector((state) => state.modal.content);

  useEffect(() => {
    document.title = "The Ticket Registry - Workshop";
  }, []);

  return (
    <div>
      <Navbar title={"Workshop"} />
      <section className="p-4 md:p-20 gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events
            .filter((event) => event.category === "workshop")
            .map((event) => (
              <Event key={event.id} eventData={event} />
            ))}
          <ModalComponent>
            {modalContent === "register" ? <Register /> : <Referral />}
          </ModalComponent>
        </div>
      </section>
      <Footer />
    </div>
  );
}
