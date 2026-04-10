import UploadVideo from "../../components/video/UploadVideo";
import { useSelector } from "react-redux";
import {
  selectUploadLoading,
  selectUploadError,
} from "../../feature/video/videoSelector";
import { use, useEffect } from "react";
import { selectIsUploadSuccess } from "../../feature/video/videoSelector";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const isLoading = useSelector(selectUploadLoading);
  const error = useSelector(selectUploadError);
  const isUploadSuccess = useSelector(selectIsUploadSuccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUploadSuccess) {
      navigate("/home");
    }
  }, [isUploadSuccess, navigate]);  

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <div className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-800">Video Upload</h1>
      </div>

      {/* Content Wrapper */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 shadow-sm">
            <span className="text-xl">⚠️</span>
            <div className="text-sm">
              <p className="font-semibold">Upload Failed</p>
              <p className="opacity-90 wrap-break-word">{error}</p>
            </div>
          </div>
        )}

        {/* Upload Component */}
        <UploadVideo isLoading={isLoading} />
      </div>
    </div>
  );
};

export default UploadPage;
