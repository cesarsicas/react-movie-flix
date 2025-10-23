const PageContainer: React.FC<React.PropsWithChildren> = (props) => {
  return <div className="p-6">{props.children}</div>;
};

export default PageContainer;
