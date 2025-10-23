import movieTheater from "../assets/movie_theater2.png";

export default function Banner() {
  return (
    <div className="relative flex h-[70vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs"
        style={{ backgroundImage: `url(${movieTheater})` }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="absolute text-center text-white">
        <h1 className="mb-2 text-5xl md:text-7xl">Welcome to ReactFlix</h1>
        <p className="mb-8 text-xl text-gray-200 md:text-2xl">
          Discover thousands of movies and series. Stream anywhere, anytime.
        </p>
      </div>
    </div>
  );
}
