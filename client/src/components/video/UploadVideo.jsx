import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadVideo } from "../../feature/video/videoApi";
import { useSelector } from "react-redux";
import { selectCategories } from "../../feature/category/categorySelector";
import { fetchCategories } from "../../feature/category/categoryApi";
import { useEffect } from "react";


const UploadVideo = ({ isLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);


  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("category", category);
    data.append("file", videoFile);
    data.append("thumbnail", thumbnailFile);

    await dispatch(uploadVideo(data));

  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-gray-800">Upload Video</h2>

        {/* Title */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter video title"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Write something about your video..."
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Category
          </label>
          <select
            name="category"
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>


        {/* Video Upload */}
        <div>
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 block">
            {videoFile ? (
              <p className="text-green-600 text-sm font-medium">
                {videoFile.name}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Click or drag video file here
              </p>
            )}

            <input
              name="file"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
          </label>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 block">
            {thumbnailFile ? (
              <p className="text-green-600 text-sm font-medium">
                {thumbnailFile.name}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">Upload thumbnail image</p>
            )}

            <input
              name="thumbnail"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
