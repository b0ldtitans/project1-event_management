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
      className="h-[100vh] text-black bg-cover bg-top"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1556340346-5e30da977c4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80)",
      }}
    >
      <header className="p-4 md:px-8">
        <nav className="flex justify-between  text-white pb-2">
          <ul className="flex gap-5">
            <Link
              to="/"
              className="overflow-ellipsis whitespace-normal text-lg font-bold text-orange-600 font-secondary"
            >
              <li>The Ticket Registry</li>
            </Link>
            <Link to="/kompetisi">
              <li className="hidden md:block">Competition</li>
            </Link>
            <Link to="/music">
              <li className="hidden md:block">Music</li>
            </Link>
            <Link to="/workshop">
              <li className="hidden md:block">Workshop</li>
            </Link>
            <Link to="/others">
              <li className="hidden md:block">Others</li>
            </Link>
          </ul>
          <ul className="flex gap-5">
            {organizer.name ? (
              <Link to="/organizer/dashboard">
                <li className="hidden md:block" href="/organizer/dashboard">
                  Dashboard
                </li>
              </Link>
            ) : (
              <>
                <li className="hidden md:block">USD</li>
                <li className="hidden md:block">Sell</li>
                <li className="hidden md:block">Points: {user.points}</li>
              </>
            )}
            <Link to="/login">
              <li className="">
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
          <h2 className="text-3xl md:text-4xl">Unforgettable Nights Await</h2>
          <h2 className="text-3xl md:text-4xl">Grab Your Tickets Today</h2>
          <SearchBar />
        </div>
      </section>
    </div>
  );
}
