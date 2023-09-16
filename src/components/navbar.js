import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ title }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      className="h-[20vh] text-white bg-cover bg-top border-b border-orange-600"
      style={{
        backgroundImage:
          "url(https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fimage_uploads%2Fhomepage%2Fhomepage-medium.jpg&w=3840&q=75)",
      }}
    >
      <div className="p-4 md:px-8">
        <nav className="flex justify-between">
          <a
            href="/"
            className="overflow-ellipsis whitespace-normal text-orange-600 font-secondary"
          >
            <h1>The Ticket Registry</h1>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-evenly md:justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden w-full z-10 border" id="mobile-navbar">
              <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
                <li>
                  <Link to="/" className="block py-2 pl-3 pr-4 text-orange-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kompetisi"
                    className="block py-2 pl-3 pr-4 text-orange-600"
                  >
                    Kompetisi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/music"
                    className="block py-2 pl-3 pr-4 text-orange-600"
                  >
                    Music
                  </Link>
                </li>
                <li>
                  <Link
                    to="/workshop"
                    className="block py-2 pl-3 pr-4 text-orange-600"
                  >
                    Workshop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/others"
                    className="block py-2 pl-3 pr-4 text-orange-600"
                  >
                    Others
                  </Link>
                </li>
                {organizer.name ? (
                  <li>
                    <Link
                      to="/organizer/dashboard"
                      className="block py-2 pl-3 pr-4 text-orange-600"
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="hidden md:block">USD</li>
                    <li className="hidden md:block">Sell</li>
                    <li className="hidden md:block">Points: {user.points}</li>
                  </>
                )}
                <li>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4 text-orange-600"
                  >
                    {user.name || organizer.name ? (
                      <span onClick={() => logout()}>Logout</span>
                    ) : (
                      "Login"
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
      <div className="flex justify-between items-center p-4 md:px-8">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </div>
  );
}

export default Navbar;
