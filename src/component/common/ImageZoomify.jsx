import ImageZoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useEffect, useState } from "react";

const ImageZoomify = ({ productId }) => {
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const fetchProductImage = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/images/image/download/${id}`
        );
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImage(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    if (productId) {
      fetchProductImage(productId);
    }
  }, [productId]);

  if (!productImage) return null;
  return (
    <ImageZoom>
      <img src={productImage} alt="Product Image" className="resized-image" />
    </ImageZoom>
  );
};

export default ImageZoomify;
