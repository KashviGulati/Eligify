const Navbar = () => {
  return (
    // <nav className="flex items-center justify-between px-12 py-6 bg-white/60 backdrop-blur-md rounded-full mx-6 mt-6 shadow-sm"></nav>
    <nav className="flex items-center justify-between px-10 py-6">
      {/* Logo */}
      <h1 className="text-2xl font-semibold text-purple tracking-wide">
        Eligify
      </h1>

      {/* Links */}
      <div className="flex items-center gap-8 text-textDark font-medium">
        <a href="#" className="hover:text-purple transition">
          Home
        </a>
        <a href="#" className="hover:text-purple transition">
          Explore
        </a>
        <a href="#" className="hover:text-purple transition">
          Dashboard
        </a>
      </div>

      {/* Button */}
      <button className="bg-purple text-white px-5 py-2 rounded-full hover:bg-purpleDark transition">
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;