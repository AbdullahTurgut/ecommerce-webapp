import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { uploadImages } from "../../store/features/imageSlice";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { BsDash, BsPlus } from "react-icons/bs";

const ImageUploader = ({ productId }) => {
  const dispatch = useDispatch();
  const fileInputRefs = useRef([]); // use directly manipulate the DOM

  const [images, setImages] = useState([]);
  const [imageInputs, setImageInputs] = useState([{ id: nanoid() }]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: nanoid(),
      name: file.name,
      file,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleAddImageInput = () => {
    setImageInputs((prevInputs) => [...prevInputs, { id: nanoid() }]);
  };

  const handleRemoveImageInput = (id) => {
    setImageInputs(imageInputs.filter((input) => input.id !== id));
    console.log("the remove input", imageInputs);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!productId) {
      return;
    }
    if (Array.isArray(images) && images.length > 0) {
      try {
        console.log("the product id from the component", productId);
        console.log("the images from the component", images);
        const result = await dispatch(
          uploadImages({
            productId,
            files: images.map((image) => image.file),
          })
        ).unwrap();
        clearFileInputs();
        toast.success(result.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const clearFileInputs = () => {
    fileInputRefs.current.forEach((input) => {
      if (input) input.value = "";
    });
  };

  return (
    <form onSubmit={handleImageUpload}>
      <div className="mt-4">
        <h5>Upload product image(s)</h5>
        <Link to={"#"} onClick={handleAddImageInput} className="icon">
          <BsPlus className="icon" /> Add more images
        </Link>
        <div className="mb-2 mt-2">
          {imageInputs.map((input, index) => (
            <div
              key={input.id}
              className="d-flex align-items-center mb-2 input-group"
            >
              <input
                className="me-2 form-control"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                ref={(e) => (fileInputRefs.current[index] = e)}
              />
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveImageInput(input.id)}
              >
                <BsDash />
              </button>
            </div>
          ))}
        </div>
        {imageInputs.length > 0 && (
          <button className="btn btn-primary btn-sm" type="submit">
            Upload Images
          </button>
        )}
      </div>
    </form>
  );
};

export default ImageUploader;
