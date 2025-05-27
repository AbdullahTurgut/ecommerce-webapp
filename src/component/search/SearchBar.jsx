import React from "react";

const SearchBar = () => {
  return (
    <div className="search-bar input-group input-group-sm">
      <select className="form-control-sm">
        <option value="all">All Category</option>
        <option value="tabs">Tabs</option>
        <option value="gadget">Gadget</option>
      </select>
      <input
        type="text"
        className="form-control"
        placeholder="Search products (e.g. iPhone, MacBook, etc.)"
      />
      <button className="search-button">Clear Filter</button>
    </div>
  );
};

export default SearchBar;
