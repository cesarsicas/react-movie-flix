import movieTheater from "../assets/movie_theater2.png";

const Banner: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="relative min-h-[50vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{ backgroundImage: `url(${movieTheater})` }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 h-full">{props.children}</div>
    </div>
  );
};

export default Banner;
