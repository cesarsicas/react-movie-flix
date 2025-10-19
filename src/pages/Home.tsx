import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";

export function Home() {
  return (
    <>
      <AppHeader />

      <div className="px-12">
        <HomeSection title="New Releases">
          <MoviesList />
        </HomeSection>

        <HomeSection title="Popular Movies">
          <MoviesList />
        </HomeSection>

        <HomeSection title="Trending">
          <MoviesList />
        </HomeSection>
      </div>

      <AppFooter />
    </>
  );
}
