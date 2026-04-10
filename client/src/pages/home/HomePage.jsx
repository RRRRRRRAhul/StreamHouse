import Navbar from "../../components/navbar/Navbar";
import VideoGrid from "../../components/video/VideoGrid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchVideos } from "../../feature/video/videoApi";
import { selectVideos } from "../../feature/video/videoSelector";
import { selectIsUploadSuccess } from "../../feature/video/videoSelector";
import { useState } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const videos = useSelector(selectVideos);
  const isUploadSuccess = useSelector(selectIsUploadSuccess);
  const [isSuccessMessage, setIsSuccessMessage] = useState(isUploadSuccess);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);


  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      {isSuccessMessage && (
        <div className="max-w-3xl mx-auto mt-4 px-4">
          <div className="flex items-start justify-between gap-4 bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-sm">
            {/* Left Content */}
            <div className="flex items-start gap-3">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold">Upload Successful</p>
                <p className="text-sm opacity-90">
                  Your video has been uploaded successfully.
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsSuccessMessage(false)}
              className="text-green-700 hover:text-green-900 text-lg font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Trending Videos</h2>
        <VideoGrid videos={videos} />
      </div>
    </div>
  );
}
