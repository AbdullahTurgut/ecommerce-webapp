import { useState } from "react";
import Hero from "../hero/Hero";
import Paginator from "../common/Paginator";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  const [currentPage, setCurrentPage] = useState([]);
  const itemsPerPage = 10; // Example value, adjust as needed

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <Hero />
      <Card className="home-product-card">
        <Link to={"#"}>Product image will be here</Link>
        <Card.Body>
          <p className="product-description">
            product name and description will be here
          </p>
          <h4 className="price">Product price</h4>
          <p className="text-success">Product inventory in stock</p>
          <Link to={"#"} className="shop-now-button">
            Show now
          </Link>
        </Card.Body>
      </Card>
      <Paginator
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
