import { useEffect, useState } from "react";
import Hero from "../hero/Hero";
import Paginator from "../common/Paginator";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductImage from "../utils/ProductImage";
import { getDistinctProductsByName } from "../services/ProductService";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchQuery, selectedCategory } = useSelector(
    (state) => state.search
  );

  const [errorMessage, setErrorMessage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Example value, adjust as needed

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getDistinctProductsByName();
        setProducts(response.data);
      } catch (error) {
        setErrorMessage(error.message);
        toast.error("Error fetching products: " + error.message);
      }
    };
    getProducts();
  }, []);

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

      return matchesQuery && matchesCategory;
    });
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, products]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Hero />
      <div className="d-flex flex-wrap justify-content-center">
        <ToastContainer />
        {currentProducts &&
          currentProducts.map((product) => (
            <Card key={product.id} className="home-product-card">
              <Link to={"#"} className="link">
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
                <p className="text-success">{product.inventory} in stock</p>
                <Link
                  to={`/products/${product.name}`}
                  className="shop-now-button"
                >
                  Show now
                </Link>
              </Card.Body>
            </Card>
          ))}

        <Paginator
          itemsPerPage={itemsPerPage}
          totalItems={currentProducts.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Home;
