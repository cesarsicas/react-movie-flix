const PageContainer: React.FC<React.PropsWithChildren> = (props) => {
  return <div className="min-h-[100vh] p-6">{props.children}</div>;
};

export default PageContainer;
