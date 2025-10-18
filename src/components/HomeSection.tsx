const HomeSection: React.FC<React.PropsWithChildren<{ title: string }>> = (
  props,
) => {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">{props.title}</h2>
      {props.children}
    </div>
  );
};

export default HomeSection;
