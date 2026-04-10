import Navbar from "../../components/navbar/Navbar";
import CategoryList from "../../components/category/categoryList";
import CategoryModal from "../../components/category/CategoryModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../feature/category/categoryApi";
import {
  selectCategories,
  selectCategoryLoading,
  selectCategoryError,
} from "../../feature/category/categorySelector";

export default function CategoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>

          <button
            onClick={handleOpenModal}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
          >
            + Create Category
          </button>
        </div>

        {/* Category List */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-semibold">Error: </strong>
            <span>{error}</span>
          </div>
        )}
        <CategoryList dummyCategories={categories} />
        <CategoryModal
          isOpen={isModalOpen}
          onClose={closeModal}
          loading={loading}
        />

        {/* Empty State (optional) */}
        {categories.length === 0 && (
          <div className="text-center mt-10 text-gray-400">
            No categories found. Create one!
          </div>
        )}
      </div>
    </div>
  );
}
