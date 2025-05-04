import React from "react";
import '../css/domamalPage.css';
import Header from '../components/header';
import Up from '../components/up'
import Gallery from "../components/gallery";


const Domamal = () => {
  return (
    <div>
      <header>
          <Header/>
          <Up/>
      </header>
      <div className="mal-container">
        <Gallery/>
      </div>
    </div>
  );
}

export default Domamal;
