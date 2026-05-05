const PageContainer: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "28px 28px 0",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      {props.children}
    </div>
  );
};

export default PageContainer;
