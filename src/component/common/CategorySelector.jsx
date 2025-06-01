import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategories,
} from "../../store/features/categorySlice";

const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
  newCategory,
  showNewCategoryInput,
  setNewCategory,
  setShowNewCategoryInput,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleAddNewCategory = () => {
    if (newCategory !== "") {
      dispatch(addCategory(newCategory));
      onCategoryChange(newCategory);
      setNewCategory("");
      setShowNewCategoryInput(false);
    }
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "New") {
      setShowNewCategoryInput(true);
    } else {
      onCategoryChange(e.target.value);
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  return <div className="mb-3"></div>;
};

export default CategorySelector;
