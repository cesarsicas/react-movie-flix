import movieTheater from "../assets/movie_theater2.png";

const Banner: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="relative flex h-[50vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs"
        style={{ backgroundImage: `url(${movieTheater})` }}
      ></div>

      <div className="absolute inset-0 bg-black/60">{props.children}</div>
    </div>
  );
};

export default Banner;
