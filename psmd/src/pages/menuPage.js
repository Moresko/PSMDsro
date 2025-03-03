import React from "react";
import '../css/menuPage.css';
import Header from '../components/header';
import DM from '../img/dom.jpg';
import ML from '../img/malovane.jpg';


const Menu = () => {
  return (
    <div class="page-container">
    <header>
        <Header/>
    </header>
    
    <div class="twoConta">
    <div class="box">
            <img src={DM} alt="imageHouse"/>
            <div class="overlay-left">
                <div className="text-box">
                    <h1>Reality</h1>
                    <div className="weAre">
                        <p>em Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
            </div>
            <button class="hover-button"><a href="/reality">Zistiť viac</a></button>
        </div>
        <div class="box">
            <img src={ML} alt="imageMug"/>
            <div class="overlay-right">
                <div className="text-box">
                    <h1>Doma Maľované</h1>
                    <div className="weAre">
                        <p>em Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
            </div>
            <button class="hover-button"><a href="/domamalovane">Zistiť viac</a></button>
        </div>
    </div>
    </div>
  );
}

export default Menu;
