import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventSelection from "./components/EventSelection";

import './App.css';
import QRScanner from './components/QRScanner';

function App() {
  return (
    <Router>
      <div className="App">
        <script src="html5-qrcode.min.js"></script>
        <Routes>
          <Route path="/" element={<EventSelection />} />
          <Route path="/scanner/:eventId/:eventName/:eventDay" element={<QRScanner
            fps={10}
            qrbox={250}
            disableFlip={false}
          />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
