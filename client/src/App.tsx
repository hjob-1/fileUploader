import axios from "axios";
import React, { useState } from "react";
import AddFile from "./components/AddFile";
import DataGrid from "./components/DataGrid";

function App() {
  return (
    <div className='App'>
      <AddFile />
      <DataGrid />
    </div>
  );
}

export default App;
