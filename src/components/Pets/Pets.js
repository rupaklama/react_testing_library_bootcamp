import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import Filter from "../Filter/Filter";
import "./Pets.css";

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    gender: "any",
    favoured: "any",
  });

  useEffect(() => {
    fetch("http://localhost:4000/cats")
      .then(response => response.json())
      .then(data => {
        setCats(data);
        setFilteredCats(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];

    if (filters.gender !== "any") {
      catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender);
    }

    if (filters.favoured !== "any") {
      catsFiltered = catsFiltered.filter(cat => {
        return cat.favoured === (filters.favoured === "liked" ? true : false);
      });
    }
    setFilteredCats(catsFiltered);
  }, [cats, filters.favoured, filters.gender]);

  if (loading) return <h1>loading...</h1>;

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={filters} setFilters={setFilters} />
        <Cards cats={filteredCats} setCats={setCats} />
      </div>
    </div>
  );
};

export default Pets;
