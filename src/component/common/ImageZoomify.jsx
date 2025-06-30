import ImageZoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useEffect, useState } from "react";

const ImageZoomify = ({ productId }) => {
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    const fetchProductImage = async (id) => {
      try {
        //const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const hostUrl = import.meta.env.VITE_API_HOST_URL;
        const response = await fetch(`${hostUrl}/images/image/download/${id}`);
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
