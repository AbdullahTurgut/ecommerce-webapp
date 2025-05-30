import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductById } from "../../store/features/productSlice";
import ImageZoomify from "../common/ImageZoomify";
import QuantityUpdater from "../utils/QuantityUpdater";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  return (
    <div className="container">
      {product ? (
        <div className="row product-details">
          <div className="col-md-2">
            {product.images.map((image) => (
              <div key={image.id} className="mt-4 image-container">
                <ImageZoomify productId={image.id} />
              </div>
            ))}
          </div>
          <div className="col-md-8 details-container">
            <h1 className="product-name">{product.name}</h1>
            <h4 className="price">{product.price}</h4>
            <p className="product-description">{product.description}</p>
            <p className="product-name">
              Brand:{" "}
              {product.brand.charAt(0).toUpperCase() +
                product.brand.slice(1).toLowerCase()}
            </p>
            <p className="product-name">
              Rating: <span className="rating">some stars</span>
            </p>
            {product.inventory && product.inventory > 1 ? (
              <p className="text-success">{product.inventory} in Stock</p>
            ) : (
              <p className="text-danger">out of Stock</p>
            )}
            <p>
              <b>Quantity: </b>
            </p>
            <QuantityUpdater />
            <div className="d-flex gap-2 mt-3">
              <button className="add-to-cart-button">
                <FaShoppingCart className="me-2" />
                Add to Cart
              </button>
              <button className="buy-now-button btn btn-warning d-flex align-items-center">
                <FaBolt />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No product!</p>
      )}
    </div>
  );
};

export default ProductDetails;
