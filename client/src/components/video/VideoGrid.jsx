import VideoCard from "./VideoCard";

const dummyVideos = [
  {
    id: 1,
    title: "Learn React in 10 Minutes",
    thumbnail: "https://via.placeholder.com/300x200",
    category: "Education",
  },
  {
    id: 2,
    title: "Django Streaming Backend",
    thumbnail: "https://via.placeholder.com/300x200",
    category: "Tech",
  },
  {
    id: 3,
    title: "Top Study Hacks",
    thumbnail: "https://via.placeholder.com/300x200",
    category: "Education",
  },
];

export default function VideoGrid({ videos = dummyVideos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}