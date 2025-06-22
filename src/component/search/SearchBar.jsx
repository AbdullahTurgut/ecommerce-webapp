import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/features/categorySlice";
import {
  setSearchQuery,
  setSelectedCategory,
  clearFilters,
} from "../../store/features/searchSlice";
import { useParams } from "react-router-dom";
import searchIcon from "../../assets/images/upload.svg";
import ImageSearch from "./ImageSearch";

const SearchBar = () => {
  const dispatch = useDispatch(); // hook to dispatch actions
  const { categoryId } = useParams();

  const categories = useSelector((state) => state.category.categories);
  const [showImageSearch, setShowImageSearch] = useState(false);

  //  const searchQuery = useSelector((state) => state.search.searchQuery);
  //const selectedCategory = useSelector( (state) => state.search.selectedCategory ); bunların yerine
  const { searchQuery, selectedCategory } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const selectedCategory = categories.find(
        (category) => category.id === parseInt(categoryId, 10)
      );
      if (selectedCategory) {
        dispatch(setSelectedCategory(selectedCategory.name));
      } else {
        dispatch(setSelectedCategory("all"));
      }
    }
  }, [categoryId, categories, dispatch]);

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setShowImageSearch(false);
  };

  const handleSearchQueryChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <div className="search-bar input-group input-group-sm">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="form-control-sm"
        >
          <option value="all">All Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="form-control"
          placeholder="Search products (e.g. iPhone, MacBook, etc.)"
        />

        <img
          src={searchIcon}
          alt="Image Search"
          className="search-image-icon"
          onClick={() => setShowImageSearch((prev) => !prev)}
        />

        <button className="search-button" onClick={handleClearFilters}>
          Clear Filter
        </button>
      </div>
      {showImageSearch && <ImageSearch />}
    </>
  );
};

export default SearchBar;
