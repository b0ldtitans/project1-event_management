import { useSelector } from "react-redux";
import Event from "./event";

export default function PopularEvents() {
  const events = useSelector((state) => state.event.events);

  return (
    <section className="p-4 md:p-20 gap-5">
      <h2 className="text-xl font-bold">Popular Events</h2>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.slice(0, 3).map((event) => (
          <Event key={event.id} eventData={event} />
        ))}
      </div>
    </section>
  );
}
