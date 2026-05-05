import movieTheater from "../../assets/movie_theater2.png";

const Banner: React.FC<React.PropsWithChildren<{ image?: string; title?: string }>> = ({
  image = movieTheater,
  title,
  children,
}) => {
  return (
    <div
      className="hero grain scanlines"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35) blur(2px)",
          transform: "scale(1.05)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, transparent 0%, var(--bg-2) 70%)",
        }}
      />

      {/* Tracking line VHS glitch */}
      <div className="tracking-line" />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, padding: "40px 44px" }}>
        {title && (
          <div className="section-title" style={{ marginBottom: 20 }}>
            <span className="num">▸</span> {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Banner;
