import { useEffect, useState } from "react";
import SearchBar from "../search/SearchBar";
import ProductCard from "./ProductCard";
import {
  getAllProducts,
  getProductsByCategoryId,
} from "../../store/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../common/Paginator";
import { setTotalItems } from "../../store/features/paginationSlice";
import Sidebar from "../common/Sidebar";
import { setInitialSearchQuery } from "../../store/features/searchSlice";
import { useLocation, useParams } from "react-router-dom";
import LoadSpinner from "../common/LoadSpinner";

const Product = () => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, selectedBrands } = useSelector((state) => state.product);
  const { searchQuery, selectedCategory } = useSelector(
    (state) => state.search
  );

  const { itemsPerPage, currentPage } = useSelector(
    (state) => state.pagination
  );

  const isLoading = useSelector((state) => state.product.isLoading);

  const { name } = useParams();
  const { categoryId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || name || "";

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategoryId(categoryId));
    } else {
      dispatch(getAllProducts());
    }
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(setInitialSearchQuery(initialSearchQuery));
  }, [initialSearchQuery, dispatch]);

  // filtering the products
  useEffect(() => {
    const results = products.filter((product) => {
      const matchesQuery = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category.name
          .toLowerCase()
          .includes(selectedCategory.toLowerCase());

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.some((selectedBrand) =>
          product.brand.toLowerCase().includes(selectedBrand.toLowerCase())
        );

      return matchesQuery && matchesCategory && matchesBrand;
    });
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, selectedBrands, products]);

  useEffect(() => {
    dispatch(setTotalItems(filteredProducts.length));
  }, [filteredProducts, dispatch]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (isLoading) {
    return (
      <div>
        <LoadSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-6 mt-2">
          <div className="search-bar input-group">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="d-flex">
        <aside className="sidebar" style={{ width: "250px", padding: "1rem" }}>
          <Sidebar />
        </aside>

        <section style={{ flex: 1 }}>
          <ProductCard products={currentProducts} />
        </section>
      </div>
      <Paginator />
    </>
  );
};

export default Product;
