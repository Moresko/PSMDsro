import React from "react";
import '../css/gallery.css';
import Mal from '../img/malovane.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../components/arrow";
import One from '../img/one.jpg';
import Two from '../img/two.jpg';
import Three from '../img/three.jpg';
import Four from '../img/four.jpg';
import Five from '../img/five.jpg';
import Six from '../img/six.jpg';

const Domamal = () => {
  const images = [One, Mal, Two, Three, Four, Five, Six]; 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div>
      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="carousel-slide">
              <img src={src} alt={`Gallery ${index}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Domamal;
