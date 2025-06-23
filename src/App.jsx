import React from "react";
import { Routes, Route } from 'react-router-dom';
import DocumentForm from "./Components/DocumentForm";

import './index.css';

function App() {
  return (
    <div className="App">
      <header className="header">
      <img src={`${import.meta.env.BASE_URL}NTSA.logo.png`} className="header-logo" alt="NTSA Logo" />
      <h1>Document Submission</h1>
      </header>

       {/* Define routes here */}
      <Routes>
        {/* Currently we have only the main route */}
        <Route path="/" element={<DocumentForm />} />
      </Routes>
    </div>
  );
}

export default App;
