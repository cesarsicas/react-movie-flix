const HomeSection: React.FC<
  React.PropsWithChildren<{ title: string; channelNum?: string }>
> = ({ title, channelNum, children }) => {
  return (
    <div style={{ marginBottom: 40 }}>
      <div className="section-title">
        {channelNum && <span className="num">{channelNum}</span>}
        {title}
      </div>
      {children}
    </div>
  );
};

export default HomeSection;
