import React from "react";
import "./App.css";

import Cards from "./components/Cards/Cards";
import Filter from "./components/Filter/Filter";

import cats from "./mocks/cats.json";

const App = () => {
  return (
    <div>
      <Filter />
      <Cards cats={cats} />
    </div>
  );
};

export default App;
