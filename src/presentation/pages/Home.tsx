import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";
import { Link, useLoaderData } from "react-router-dom";
import getTitlesUseCase from "../../domain/usecases/getTitlesUseCase";
import type MovieModel from "../../domain/model/MovieModel";
import getProfileUseCase from "../../domain/usecases/getProfileUseCase";

export function Home() {
  const { releases } = useLoaderData() as { releases: MovieModel[] };
  const featured = releases[0];

  return (
    <>
      {/* Hero */}
      {featured && (
        <Banner image={featured.posterUrl || undefined}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 32,
              alignItems: "flex-end",
              minHeight: 400,
            }}
          >
            <div style={{ paddingBottom: 8 }}>
              <div style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
                <span className="sticker flat">
                  {featured.type?.replace(/_/g, " ") || "Movie"}
                </span>
                <span className="font-crt muted" style={{ fontSize: 14 }}>
                  NEW RELEASE
                </span>
              </div>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  lineHeight: 0.95,
                  color: "var(--label)",
                  marginBottom: 16,
                }}
              >
                {featured.title}
              </h1>
              {featured.description && (
                <p
                  className="muted"
                  style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 480 }}
                >
                  {featured.description.slice(0, 160)}
                  {featured.description.length > 160 ? "…" : ""}
                </p>
              )}
              <div style={{ display: "flex", gap: 12 }}>
                <Link
                  to={`/title/details/${featured.externalId}`}
                  className="btn btn-primary"
                >
                  ▶ Play
                </Link>
                <Link
                  to={`/title/details/${featured.externalId}`}
                  className="btn btn-ghost"
                >
                  + Details
                </Link>
              </div>
            </div>
            <div />
          </div>
        </Banner>
      )}

      <PageContainer>
        <HomeSection title="New Releases" channelNum="CH 01">
          <MoviesList movies={releases.slice(0, 12)} />
        </HomeSection>

        <HomeSection title="Popular" channelNum="CH 02">
          <MoviesList movies={releases.slice(12, 24)} />
        </HomeSection>

        <HomeSection title="Trending" channelNum="CH 03">
          <MoviesList movies={releases.slice(24, 36)} />
        </HomeSection>

        {/* Decorative CRT marquee */}
        <div
          className="dashed-box font-crt muted"
          style={{
            overflow: "hidden",
            marginBottom: 40,
            fontSize: 13,
            letterSpacing: "0.15em",
            padding: "10px 0",
          }}
        >
          <div className="marquee-track">
            {Array(6)
              .fill("BE KIND · REWIND · NEW RELEASES EVERY WEEK · WATCH PARTY LIVE · ASK FLIX AI · ")
              .join("")}
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export async function moviesLoader(): Promise<{ releases: MovieModel[] }> {
  const data = await getTitlesUseCase();
  await getProfileUseCase();
  return { releases: data.releases };
}
