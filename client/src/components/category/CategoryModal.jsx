import { useState, useEffect } from "react";
import { createCategory } from "../../feature/category/categoryApi";
import { useDispatch } from "react-redux";
import { createCategoryFailure } from "../../feature/category/categorySlice";

export default function CategoryModal({
  isOpen,
  onClose,
  initialData = null, 
  loading = false,
}) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      dispatch(createCategoryFailure("Category name cannot be empty."));
      return;
    }
    dispatch(createCategory(name));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      
      {/* Modal Box */}
      <div className="bg-gray-900 text-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Category" : "Create Category"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 p-2 rounded font-semibold disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update Category"
              : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
}