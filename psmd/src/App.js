import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MP from './pages/menuPage';
import Scroll from './components/scroll';
import './css/app.css';
import CP from './pages/contactPage';
import DP from './pages/domamalPage';
import RP from './pages/realityPage';

const App = () => {
  return (
    <Router>
      <div>
        <Scroll/>
        <Routes>
          <Route path="/home" element={<MP />} />
          <Route path="/contact" element={<CP />} />
          <Route path="/domamalovane" element={<DP />} />
          <Route path="/reality" element={<RP />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
  