import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

export default function Hero() {
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

  function logout() {
    if (user.name) {
      setUser({});
      localStorage.removeItem("user");
    } else if (organizer.name) {
      setOrganizer({});
      localStorage.removeItem("organizer");
    }
  }

  return (
    <div
      className="h-[100vh] text-white bg-cover bg-top"
      style={{
        backgroundImage:
          "url(https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fimage_uploads%2Fhomepage%2Fhomepage-medium.jpg&w=3840&q=75)",
      }}
    >
      <header className="p-4 md:px-8">
        <nav className="flex justify-between">
          <ul className="flex gap-5">
            <Link to="/"><li>Home</li></Link>
            <Link to="/kompetisi"><li className="hidden md:block">Kompetisi</li></Link>
            <Link to="/music"><li className="hidden md:block">Music</li></Link>
            <Link to="/workshop"><li className="hidden md:block">Workshop</li></Link>
            <Link to="/others"><li className="hidden md:block">Others</li></Link>
          </ul>
          <ul className="flex gap-5">
            {organizer.name ? (
            <Link to="/organizer/dashboard">
              <li className="hidden md:block" href="/organizer/dashboard">Dashboard</li>
            </Link> 
            ) : ( 
                <>
                  <li className="hidden md:block">USD</li>
                  <li className="hidden md:block">Sell</li>
                  <li className="hidden md:block">Points: {user.points}</li>
                </>
              )}
            <Link to="/login">
              <li className="hidden md:block">
                {user.name || organizer.name ? (
                  <span onClick={() => logout()}>Logout</span>
                ) : (
                  "Login"
                )}
              </li>
            </Link>
          </ul>
        </nav>
      </header>
      <section className="flex flex-col justify-center items-center h-[50vh] md:h-[60vh]">
        <div className="p-4 text-center md:text-left md:w-1/2 md:ml-20 lg:ml-32">
          <h1 className="text-5xl md:text-6xl">
            {user.name ? `Welcome, ${user.name}!` : "Welcome!"}
          </h1>
          <h2 className="text-3xl md:text-4xl">
            Your next best night ever is waiting
          </h2>
          <h2 className="text-3xl md:text-4xl">And we have the tickets</h2>
            <SearchBar />
        </div>
      </section>
    </div>
  );
}
