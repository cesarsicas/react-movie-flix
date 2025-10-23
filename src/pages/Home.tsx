import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";

export function Home() {
  return (
    <PageContainer>
      <Banner>
        <div className="tems-center flex h-full w-full flex-col justify-center text-center text-white">
          <h1 className="mb-2 text-5xl md:text-7xl">Welcome to ReactFlix</h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl">
            Discover thousands of movies and series. Stream anywhere, anytime.
          </p>
        </div>
      </Banner>
      <HomeSection title="New Releases">
        <MoviesList />
      </HomeSection>

      <HomeSection title="Popular Movies">
        <MoviesList />
      </HomeSection>

      <HomeSection title="Trending">
        <MoviesList />
      </HomeSection>
    </PageContainer>
  );
}
