export default function VideoCard({ video }) {
  return (
    <div className="bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer">
      <img
        src={video.thumbnail}
        alt="thumbnail"
        className="w-full h-40 object-cover"
      />

      <div className="p-3">
        <h3 className="text-md font-semibold line-clamp-2">
          {video.title}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {video.video_category || "Uncategorized"}
        </p>
        <button className="w-full bg-red-500 hover:bg-red-600 p-2 rounded font-semibold mt-2">
          <a href={`/video/${video.id}`} className="text-white no-underline">
            Watch Video
          </a>
        </button>
      </div>
    </div>
  );
}