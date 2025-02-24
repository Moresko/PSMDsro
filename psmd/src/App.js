import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MP from './pages/menuPage';
import Scroll from './components/scroll';
import './css/app.css'

const App = () => {
  return (
    <Router>
      <div>
        <Scroll/>
        <Routes>
          <Route path="/home" element={<MP />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
