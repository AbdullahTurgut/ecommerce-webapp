import { useEffect, useState } from "react";

const ProductImage = ({ productId }) => {
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
    <div>
      <img src={productImage} alt="Product Image" />
    </div>
  );
};

export default ProductImage;
