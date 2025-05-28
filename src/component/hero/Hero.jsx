import { useState } from "react";
import HeroSlider from "./HeroSlider";
import SearchBar from "../search/SearchBar";
import { useDispatch } from "react-redux";
import {
  setSearchQuery,
  setSelectedCategory,
  clearFilters,
} from "../../store/features/searchSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="hero">
      <HeroSlider setCurrentSlide={currentSlide} />
      <div className="hero-content">
        <h1>
          Welcome to <span className="text-primary">buyNow</span>.com
        </h1>
        <SearchBar
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onCategoryChange={(category) =>
            dispatch(setSelectedCategory(category))
          }
          onClear={handleClearFilters}
        />
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
