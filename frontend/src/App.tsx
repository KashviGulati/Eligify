import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfileCard from "./components/ProfileCard";
import Results from "./components/Results";

function App() {
  return (
    <div className="bg-ivory min-h-screen">
      <Navbar />
      <Hero />
      <ProfileCard />
      <Results />
    </div>
  );
}

export default App;
