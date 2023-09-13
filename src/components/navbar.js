import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar({title}) {
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
    className="h-[20vh] text-white bg-cover bg-top"
    style={{
      backgroundImage:
        "url(https://seatgeek.com/_next/image?url=https%3A%2F%2Fseatgeek.com%2Fimages%2Fimage_uploads%2Fhomepage%2Fhomepage-medium.jpg&w=3840&q=75)",
    }}
    >
    <div className="p-4 md:px-8">
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
    </div>
    <div className="flex justify-between items-center p-4 md:px-8">
      <h1 className="text-4xl font-bold">{title}</h1>
    </div>
    </div>
);
}

export default Navbar;
