import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const Rooms = () => {
  const { floor, ward } = useParams();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get(`/patient/rooms/${floor}/${ward}`);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, [floor, ward]);

  return (
    <div className="list-section">
      <h3>Rooms in {ward}</h3>
      {rooms.map((room) => (
        <Link key={room} to={`/dietitian/beds/${floor}/${ward}/${room}`} className="list-item">
          {room}
        </Link>
      ))}
    </div>
  );
};

export default Rooms;
