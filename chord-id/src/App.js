import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Play from "./pages/Play";
import NotFound from "./pages/NotFound";
import './App.css';
import data from "./chordData";

function App() {

    const [chordTypes, setChordTypes] = React.useState(data.allChordTypes)

  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings chordTypes={chordTypes} setChordTypes={setChordTypes} />} />
              <Route path="/play" element={<Play chordTypes={chordTypes} />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;