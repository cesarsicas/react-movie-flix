import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import Banner from "../components/Banner";
import HomeSection from "../components/HomeSection";
import MoviesList from "../components/MoviesList";
import PageContainer from "../components/PageContainer";

export function Home() {
  return (
    <PageContainer>
      <Banner />
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
