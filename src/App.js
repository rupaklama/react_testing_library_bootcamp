import React from "react";
import "./App.css";
import Card from "./components/Card/Card";

const App = () => {
  return (
    <div>
      <Card
        image={{
          url: "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          alt: "cute cat",
        }}
        name="Tinku"
        phone="111-111-1111"
        email="pak@hotmail.com"
        favoured={false}
      />
    </div>
  );
};

export default App;
