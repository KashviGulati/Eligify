import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProfileCard from "./components/ProfileCard";
import Results from "./components/Results";

function App() {
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
  const checkProfile = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/profile/");

      if (res.status === 200) {
        setHasProfile(true);
      } else {
        setHasProfile(false);
      }
    } catch (err) {
      setHasProfile(false);
    }
  };

  checkProfile();
}, []);

  return (
    <div className="bg-ivory min-h-screen">
      <Navbar />
      <Hero />

      {!hasProfile ? (
        <ProfileCard onSave={() => setHasProfile(true)} />
      ) : (
        <Results />
      )}
    </div>
  );
}

export default App;