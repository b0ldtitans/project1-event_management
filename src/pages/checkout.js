import BillingInfo from "../features/paymentForms/BillingInfo.js";
import YourOrder from "../features/paymentForms/yourOrder.js";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import api from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { id } = useParams();

  useEffect(() => {
    // Simulate a 1500ms delay before setting isLoading to false
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    api
      .get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // Render the actual content when isLoading is false
  return (
    <>
      <Navbar title={"Checkout Tiket"} />
      <div className="lg:flex mb-16 lg:flex-row lg:gap-6 lg:justify-evenly hover:shadow-2xl">
        {/* Mobile view (flex-col) */}
        <div className="flex flex-col lg:hidden">
          <YourOrder />
          <BillingInfo />
        </div>

        {/* PC view (flex-row) */}
        <div className="hidden mb-16 lg:flex lg:flex-row lg:justify-between">
          <BillingInfo />
          <YourOrder />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
