export default function ContactCTA() {
  return (
    <section
      className="relative py-24 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.8)), url('/image/contact/vastu-bg.jpg')",
      }}
    >
      {/* Subtle background pattern */}
    <div className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
     style={{
       backgroundImage: "url('https://i.pinimg.com/1200x/9c/ed/e6/9cede6f1a147c97746937b7ded9d00f2.jpg')"
     }}
/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">

        <div data-aos="fade-up" className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide">
            Bring Harmony & Positive Energy to Your Space
          </h2>

          <p className="max-w-2xl mx-auto text-gray-300">
            Discover authentic Vastu solutions designed to balance energy,
            attract prosperity, and create a peaceful environment in your home or workspace.
          </p>

          <div className="flex justify-center gap-4 pt-4">
          <a
  href="/contact"
  className="inline-flex items-center gap-2 bg-orange-500 px-4 md:px-8 py-3 text-white font-semibold tracking-wide hover:bg-orange-600 transition"
>
  Get Vastu Consultation 
</a>

            <a
              href="/shop"
              className="inline-flex items-center gap-2 border border-white/30 px-4 md:px-8 py-3 text-white font-semibold tracking-wide hover:bg-white hover:text-black transition"
            >
              Explore Vastu Products
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}