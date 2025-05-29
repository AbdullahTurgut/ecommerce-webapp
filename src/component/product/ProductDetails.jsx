import { useParams } from "react-router-dom";
import ProductImage from "../utils/ProductImage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductById } from "../../store/features/productSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  return (
    <div className="container">
      <div className="row product-details">
        <div className="col-md-2">
          {product.image.map((image) => (
            <div key={image.id} className="mt-4">
              <ProductImage imageId={image.id} />
            </div>
          ))}
        </div>
        <div className="col-md-8 details-container">
          <h1 className="product-name">{product.name}</h1>
          <h4 className="price">{product.price}</h4>
          <p className="product-description">{product.description}</p>
          <p className="product-name">Brand: {product.brand.toLowerCase()}</p>
          <p className="product-name">
            Rating: <span className="rating">some stars</span>
          </p>
          <p className="text-success">In Stock</p>
          <p>Quantity: </p>
          <p>Quantity update coming here...</p>
          <div className="d-flex gap-2 mt-3">
            <button className="add-to-cart-button">Add to Cart</button>
            <button className="buy-now-button">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
