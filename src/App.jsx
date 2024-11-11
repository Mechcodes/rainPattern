
import React from "react";
import Grid from "./Grid";
import "./App.css";

function App() {
  return (
    <div className="App  ">
      <h1>Falling Rain Pattern</h1>
      <Grid rows={15} cols={20} />
    </div>
  );
}

export default App;
