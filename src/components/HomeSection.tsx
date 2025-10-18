import MoviesList from "./MoviesList";

const HomeSection: React.FC<React.PropsWithChildren<{ title: string }>> = (
  props,
) => {
  return (
    <div className="min-h-100 bg-slate-300 p-15">
      <h2 className="mb-5">{props.title}</h2>

      <MoviesList />
    </div>
  );
};

export default HomeSection;
