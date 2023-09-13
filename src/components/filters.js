import React, { useState, useEffect } from "react";

export default function Filters() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <section 
      className="p-4 md:p-20 gap-5 relative"
      style={{
        backgroundImage: 'url(https://img.freepik.com/premium-vector/city-map-background-blue-tone_99087-101.jpg?w=1380)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h2 className="text-white">Browse Events</h2>
      <h2 className="text-3xl font-bold text-white">{
        user && user.address ? `${user.address}` : "Menteng Atas, ID"
      }</h2>
      <br />  
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <button className="rounded-full border-2 px-2 py-1 mb-2 md:mb-0 text-white">
          Change location
        </button>
        <button className="rounded-full border-2 px-2 py-1 text-white ">
          Filter by date
        </button>
      </div>
    </section>
  );
}
