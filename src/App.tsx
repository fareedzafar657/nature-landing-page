import BackgroundImage from "./components/background-image";
import Header from "./components/header";
import HeroContent from "./components/hero-content";

function App() {
  return (
    <BackgroundImage>
      <div className="min-h-screen flex flex-col py-7 px-6 2xl:py-10 2xl:px-8">
        <header>
          <Header />
        </header>

        <main className="flex-1 flex items-center justify-center">
          <HeroContent />
        </main>
      </div>
    </BackgroundImage>
  );
}

export default App;
