import { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import Paginator from "../common/Paginator";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductImage from "../utils/ProductImage";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setTotalItems } from "../../store/features/paginationSlice";
import { getDistinctProductsByName } from "../../store/features/productSlice";
import LoadSpinner from "../common/LoadSpinner";
import StockStatus from "../utils/StockStatus";

const Home = () => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchQuery, selectedCategory, imageSearchResults } = useSelector(
    (state) => state.search
  );

  const { itemsPerPage, currentPage } = useSelector(
    (state) => state.pagination
  );

  const isLoading = useSelector((state) => state.product.isLoading);
  const products = useSelector((state) => state.product.distinctProducts);

  useEffect(() => {
    dispatch(getDistinctProductsByName());
  }, [dispatch]);

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

      const matchesImageSearch =
        imageSearchResults.length > 0
          ? imageSearchResults.some((result) =>
              product.toLowerCase().includes(result.name.toLowerCase())
            )
          : true;

      return matchesQuery && matchesCategory && matchesImageSearch;
    });
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, imageSearchResults, products]);

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
      <Hero />
      <div className="d-flex flex-wrap justify-content-center p-5">
        <ToastContainer />
        {currentProducts &&
          currentProducts.map((product) => (
            <Card key={product.id} className="home-product-card">
              <Link to={`/products/${product.name}`} className="link">
                <div className="image-container">
                  {product.images.length > 0 && (
                    <ProductImage productId={product.images[0].id} />
                  )}
                </div>
              </Link>
              <Card.Body>
                <p className="product-description">
                  {product.name} - {product.description}
                </p>
                <h4 className="price">{product.price}</h4>

                <StockStatus inventory={product.inventory} />

                <Link
                  to={`/products/${product.name}`}
                  className="shop-now-button"
                >
                  Show now
                </Link>
              </Card.Body>
            </Card>
          ))}
      </div>
      <Paginator />
    </>
  );
};

export default Home;
