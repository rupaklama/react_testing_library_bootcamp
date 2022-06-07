import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import Filter from "../Filter/Filter";
import "./Pets.css";

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/cats")
      .then(response => response.json())
      .then(data => setCats(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>loading...</h1>;

  return (
    <div className="container">
      <div className="app-container">
        <Filter />
        <Cards cats={cats} />
      </div>
    </div>
  );
};

export default Pets;
