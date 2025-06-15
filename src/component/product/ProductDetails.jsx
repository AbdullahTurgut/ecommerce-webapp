import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductById, setQuantity } from "../../store/features/productSlice";
import ImageZoomify from "../common/ImageZoomify";
import QuantityUpdater from "../utils/QuantityUpdater";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../store/features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import StockStatus from "../utils/StockStatus";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { product, quantity } = useSelector((state) => state.product);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);
  const productOutOfStock = product?.inventory <= 0;

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }
    try {
      await dispatch(addToCart({ productId, quantity })).unwrap();
      toast.success(successMessage);
    } catch (error) {
      toast.error(errorMessage || "Failed to add item to cart.");
    }
  };

  const handleIncreaseQuantity = () => {
    dispatch(setQuantity(quantity + 1));
  };
  const handleDecreaseQuantity = () => {
    dispatch(setQuantity(quantity - 1));
  };

  return (
    <div className="container mt-4 mb-4">
      <ToastContainer />
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

            <StockStatus inventory={product.inventory} />

            <p>
              <b>Quantity: </b>
            </p>
            <QuantityUpdater
              quantity={quantity}
              onDecrease={handleDecreaseQuantity}
              onIncrease={handleIncreaseQuantity}
              disabled={productOutOfStock}
            />
            <div className="d-flex gap-2 mt-3">
              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={productOutOfStock}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </button>
              <button className="buy-now-button" disabled={productOutOfStock}>
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
