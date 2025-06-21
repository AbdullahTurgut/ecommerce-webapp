import { useState } from "react";
import HeroSlider from "./HeroSlider";
import SearchBar from "../search/SearchBar";

const Hero = () => {
  const [currentSlide] = useState(0);

  return (
    <div className="hero">
      <HeroSlider setCurrentSlide={currentSlide} />
      <div className="hero-content">
        <h1>
          Welcome to <span className="text-primary">zenCargo</span>.com
        </h1>
        <SearchBar />
        <div className="home-button-container">
          <a href="#" className="home-shop-button link">
            Shop Now
          </a>
          <button className="deals-button">Today's Deal</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
