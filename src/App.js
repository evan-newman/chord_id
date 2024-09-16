import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Settings from "./components/Settings";
import Play from "./components/Play";
import NotFound from "./components/NotFound";
import './styles/App.css';
import data from "./chordData";

function App() {

    const [chordTypes, setChordTypes] = React.useState(data.allChordTypes)

  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/chord_id" element={<Home />} />
              <Route path="/chord_id/settings" element={<Settings chordTypes={chordTypes} setChordTypes={setChordTypes} />} />
              <Route path="/chord_id/play" element={<Play chordTypes={chordTypes} />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;