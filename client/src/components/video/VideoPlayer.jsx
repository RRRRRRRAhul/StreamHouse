export default function VideoPlayer({id}) {
  return (
    <div className="w-full bg-black rounded-xl overflow-hidden shadow-lg">
      <video controls className="w-full">
        <source
          src={`http://127.0.0.1:8000/api/videos/stream/${id}/`}
          type="video/mp4"
        />
      </video>
    </div>
  );
}