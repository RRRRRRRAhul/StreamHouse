import Navbar from "../../components/navbar/Navbar";
import VideoPlayer from "../../components/video/VideoPlayer";
import { useParams } from "react-router-dom";

export default function VideoPlayerPage() {
  const { id } = useParams();


  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <VideoPlayer id={id}/>

        <h1 className="text-2xl font-bold mt-4">
          Django Video Streaming Tutorial
        </h1>

        <p className="text-gray-400 mt-2">
          Learn how to stream videos using Django REST Framework with Range Requests.
        </p>
      </div>
    </div>
  );
}