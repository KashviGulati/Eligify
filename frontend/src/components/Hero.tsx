const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center mt-20 px-6">
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-semibold text-textDark leading-tight max-w-4xl">
        Discover scholarships that{" "}
        <span className="text-purple">fit you perfectly</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg text-gray-600 max-w-2xl">
        Eligify helps you find the most suitable scholarships based on your
        profile — no confusion, no repeated forms.
      </p>

      {/* CTA */}
      <button className="mt-8 bg-purple text-white px-8 py-3 rounded-full hover:bg-purpleDark transition">
        Get Started
      </button>
    </section>
  );
};

export default Hero;