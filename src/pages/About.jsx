// import { FaShippingFast, FaStar, FaLock } from "react-icons/fa";
// import ContactCTA from "../components/ContactCTA";
// import { Link } from "react-router-dom";
// import Testimonials from "../components/Testimonials";

// export default function About() {
//   return (
//     <main className="bg-white">
 
//       {/* HERO SECTION */}
//       {/* <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.7)), url('/image/about/breadcrumb-bg.jpg')",
//         }}
//       >
//         <div className="text-center text-white px-6" data-aos="fade-up">
//           <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wide">
//             About <span className="text-accent"> HARVON</span>
//           </h1>
//           <p className="mt-4 max-w-2xl mx-auto text-gray-200">
//             Crafted with purpose. Designed for modern lifestyles.
//           </p>
//         </div>
//       </section> */}

      

//       {/* ABOUT CONTENT */}
// <section className="py-20 overflow-hidden font-body">
//   <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

//     {/* TEXT */}
//     <div 
//       data-aos="fade-right"
//       className="space-y-5"
//     >
//       <h2 className="text-4xl font-heading font-bold text-black mb-2 tracking-wide">
//         Who We Are
//       </h2>

//       <p className="text-gray-600 leading-relaxed text-[15px]">
//         <span className="text-black font-semibold">Vastukkalp</span> is a trusted Vastu and spiritual brand dedicated to
//         bringing positivity, prosperity, and harmony into your life through
//         scientifically designed Vastu products.
//       </p>

//       <p className="text-gray-600 leading-relaxed text-[15px]">
//         Our products are inspired by ancient Vastu Shastra principles and are
//         crafted with precision to remove negative energy and attract success,
//         peace, and good fortune in your home and workplace.
//       </p>

//       <p className="text-xl text-black mt-4 font-semibold font-heading">
//         Our Key Features :
//       </p>

//       <ol className="list-disc ml-6 text-gray-600 space-y-2 text-[15px]">
//         <li data-aos="fade-right" data-aos-delay="100">100% Vastu-based authentic products</li>
//         <li data-aos="fade-right" data-aos-delay="200">Energy-balanced and spiritually designed items</li>
//         <li data-aos="fade-right" data-aos-delay="300">Trusted by thousands of happy customers</li>
//         <li data-aos="fade-right" data-aos-delay="400">Positive energy & prosperity enhancement</li>
//       </ol>

//       <Link
//         to="/shop"
//         data-aos="fade-right"
//         data-aos-delay="500"
//         className="inline-flex items-center gap-3 bg-black px-7 py-3 text-white font-medium tracking-wide hover:opacity-90 transition mt-4 rounded-full"
//       >
//         Explore Products
//         <span className="text-lg">→</span>
//       </Link>
//     </div>

//     {/* IMAGE */}
//     <div 
//       data-aos="fade-left"
//       data-aos-delay="200"
//       className="flex justify-center"
//     >
//       <img
//         src="https://kkvastukkalp.com/wp-content/uploads/2024/07/compass-isolated-white-background-3d-render-illustration-removebg-preview.png"
//         alt="Vastu Products"
//         className="rounded-2xl shadow-xl md:h-[500px] h-[300px] object-contain transition duration-500 hover:scale-105"
//       />
//     </div>

//   </div>
// </section>


// {/* MISSION & VISION */}
// <section className="py-10 bg-gray-50">
//   <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

//     <div data-aos="fade-up" className="border border-black/30 rounded-lg p-8">
//       <h3 className="text-2xl font-heading font-semibold text-black mb-3">
//         Our Mission
//       </h3>
//       <p className="text-gray-600 leading-relaxed">
//         To help people live a balanced and prosperous life by providing
//         effective Vastu solutions that eliminate negativity and enhance
//         positive energy in everyday living.
//       </p>
//     </div>

//     <div data-aos="fade-up" data-aos-delay="150" className="border border-black/30 rounded-lg p-8">
//       <h3 className="text-2xl font-heading font-semibold text-black mb-3">
//         Our Vision
//       </h3>
//       <p className="text-gray-600 leading-relaxed">
//         To become a leading Vastu brand known for authenticity, trust, and
//         powerful spiritual solutions that transform lives globally.
//       </p>
//     </div>
//   </div>
// </section>


// {/* WHY CHOOSE US */}
// <section className="py-16">
//   <div className="max-w-7xl mx-auto px-6">

//     <div className="text-center mb-12" data-aos="fade-up">
//       <h2 className="text-3xl font-heading font-bold text-black">
//         Why Choose Vastukkalp
//       </h2>
//       <p className="mt-2 text-gray-600">
//         Experience the power of Vastu in your life
//       </p>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

//       <div className="p-6 border rounded-lg hover:shadow-lg transition" data-aos="zoom-in">
//         <FaStar className="text-3xl text-black mx-auto mb-4" />
//         <h4 className="font-semibold mb-2">
//           Authentic Vastu Products
//         </h4>
//         <p className="text-gray-600 text-sm">
//           Designed based on proven Vastu principles for real results.
//         </p>
//       </div>

//       <div className="p-6 border rounded-lg hover:shadow-lg transition" data-aos="zoom-in" data-aos-delay="100">
//         <FaShippingFast className="text-3xl text-black mx-auto mb-4" />
//         <h4 className="font-semibold mb-2">
//           Fast Delivery
//         </h4>
//         <p className="text-gray-600 text-sm">
//           Safe and quick shipping across India.
//         </p>
//       </div>

//       <div className="p-6 border rounded-lg hover:shadow-lg transition" data-aos="zoom-in" data-aos-delay="200">
//         <FaLock className="text-3xl text-black mx-auto mb-4" />
//         <h4 className="font-semibold mb-2">
//           Trusted & Secure
//         </h4>
//         <p className="text-gray-600 text-sm">
//           Reliable service with secure payment options.
//         </p>
//       </div>

//     </div>
//   </div>
// </section>

//       <Testimonials />

//       {/* CTA */}
//       <ContactCTA />

//     </main>
//   );
// }

import { FaShippingFast, FaStar, FaLock, FaChevronRight } from "react-icons/fa";
import ContactCTA from "../components/ContactCTA";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";

export default function About() {
  return (
    <main className="bg-[#FCFBFA] text-slate-900 overflow-hidden font-body">
      
      {/* 1. VASTU INSPIRED HERO */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div data-aos="fade-down" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
            </span>
            Vastukkalp • Authentic Vastu Solutions
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-bold leading-[1.1] tracking-tight text-black" data-aos="zoom-out">
            Energizing Spaces. <br />
            <span className="text-orange-600 italic font-serif">Inviting Prosperity.</span>
          </h1>
          <p className="mt-8 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            At Vastukkalp, we blend ancient Vastu Shastra with scientifically crafted tools to remove negative energies and align your home with cosmic balance.
          </p>
        </div>
      </section>

      {/* 2. THE VASTUKKALP STORY */}
      <section className="py-20 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Image Composition - Orange Aura */}
            <div className="relative" data-aos="fade-right">
              {/* Energy Glow effect using Orange */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-200 rounded-full blur-[100px] opacity-40"></div>
              <div className="relative z-10 bg-white p-6 rounded-[3rem] shadow-2xl border border-orange-100">
                <img
                  src="https://kkvastukkalp.com/wp-content/uploads/2024/07/compass-isolated-white-background-3d-render-illustration-removebg-preview.png"
                  alt="Vastu Compass"
                  className="w-full h-auto drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8" data-aos="fade-left">
              <h2 className="text-4xl font-heading font-bold text-black">
                The Core of <span className="text-orange-600 underline decoration-orange-200 underline-offset-8">Vastukkalp</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  <span className="text-black font-semibold">Vastukkalp</span> was born from a deep-rooted passion for Vedic sciences. We believe that a house is not just brick and mortar, but a living energy field that impacts your health, wealth, and happiness.
                </p>
                <p>
                  Our products are not mere decorative items; they are precision-engineered Vastu corrections. From Pyramids to Energized Crystals, every piece is designed to rectify "Vastu Dosha" and create a flow of positive <span className="text-orange-600 font-medium italic">Prana</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {["100% Authentic Vedic Science", "Dosha Rectification", "Scientific Energy Maps"].map((tag) => (
                  <span key={tag} className="px-5 py-2 rounded-full bg-[#FFF7F0] border border-orange-100 text-orange-800 text-sm font-semibold shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-4 bg-black px-8 py-4 text-white text-sm font-bold tracking-widest hover:bg-orange-600 transition-all rounded-xl shadow-lg shadow-gray-200"
              >
                BROWSE VASTU TOOLS <FaChevronRight className="text-xs text-orange-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Black & Orange Theme) */}
      <section className="py-24 bg-black text-white rounded-[4rem] mx-4 my-10 overflow-hidden relative border-y-4 border-orange-600">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="p-10 rounded-[2rem] bg-white  border border-white/10" data-aos="fade-up">
              <h3 className="text-orange-500 font-mono text-sm mb-4 tracking-[0.3em] uppercase">Vastu Mission</h3>
              <p className="text-2xl font-heading leading-snug text-black">
                "To remove structural negativity from every household using authentic Vastu remedies, ensuring a life of peace and abundance."
              </p>
            </div>
            <div className="p-10 rounded-[2rem] bg-orange-600 shadow-[0_0_50px_rgba(234,88,12,0.3)]" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-black font-mono text-sm mb-4 tracking-[0.3em] uppercase font-bold">The Vision</h3>
              <p className="text-2xl font-heading leading-snug text-white">
                "To become India's most trusted authority in Vastu corrections, blending spiritual heritage with modern lifestyle needs."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE VASTUKKALP */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-black">Authenticity in <span className="italic font-serif text-orange-600">Every Detail.</span></h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaStar />, title: "Vetted by Experts", desc: "Every product is verified for its energy-shifting properties by seasoned Vastu consultants." },
              { icon: <FaShippingFast />, title: "Safe & Pure Delivery", desc: "We ensure our spiritual items are handled with purity and delivered securely to your doorstep." },
              { icon: <FaLock />, title: "Trusted Solutions", desc: "Secure shopping with 100% guarantee on the authenticity of every Vastu pyramid and crystal." }
            ].map((feature, i) => (
              <div key={i} className="group p-10 bg-white border border-orange-50 rounded-[2.5rem] hover:bg-black hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-500 group-hover:text-gray-300 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="bg-orange-50/30">
        <Testimonials />
      </div>

      <ContactCTA />
    </main>
  );
}


// import { FaShippingFast, FaStar, FaLock, FaArrowRight } from "react-icons/fa";
// import ContactCTA from "../components/ContactCTA";
// import { Link } from "react-router-dom";
// import Testimonials from "../components/Testimonials";

// export default function About() {
//   return (
//     <main className="bg-[#FCFCFC] overflow-hidden">
      
//       {/* 1. MINIMALIST HERO SECTION */}
//       <section className="relative pt-20 pb-12 md:pt-32 md:pb-24">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <div data-aos="fade-down" className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-black text-white rounded-full">
//             Est. 2024 — Vastukkalp
//           </div>
//           <h1 className="text-5xl md:text-7xl font-heading font-bold text-black tracking-tight leading-tight" data-aos="fade-up">
//             Aligning Spaces. <br />
//             <span className="italic font-serif font-light text-gray-500">Transforming Lives.</span>
//           </h1>
//         </div>
//       </section>

//       {/* 2. MAIN STORY SECTION */}
//       <section className="pb-24">
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
//           {/* IMAGE WITH AURA EFFECT */}
//           <div className="lg:col-span-5 relative" data-aos="zoom-in-right">
//             <div className="absolute -inset-4 bg-gradient-to-tr from-orange-100 to-blue-50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
//             <div className="relative bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100">
//               <img
//                 src="https://kkvastukkalp.com/wp-content/uploads/2024/07/compass-isolated-white-background-3d-render-illustration-removebg-preview.png"
//                 alt="Vastu Compass"
//                 className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700"
//               />
//             </div>
//           </div>

//           {/* CONTENT */}
//           <div className="lg:col-span-7 space-y-8" data-aos="fade-left">
//             <div>
//               <h2 className="text-3xl font-heading font-bold text-black mb-6">Our Philosophy</h2>
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 <span className="text-black font-semibold">Vastukkalp</span> isn't just a brand; it's a bridge between ancient wisdom and modern living. We believe your environment is a reflection of your inner state.
//               </p>
//               <p className="mt-4 text-gray-600 leading-relaxed">
//                 By blending scientifically designed Vastu products with spiritual precision, we help you curate spaces that vibrate with success, peace, and unshakeable harmony.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 "100% Authentic Vedic Science",
//                 "Energy-Balanced Geometry",
//                 "Trusted by 5000+ Homes",
//                 "Spiritual Empowerment"
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center gap-3 group" data-aos="fade-up" data-aos-delay={idx * 100}>
//                   <div className="h-2 w-2 bg-black rounded-full group-hover:scale-150 transition-transform"></div>
//                   <span className="text-sm font-medium text-gray-800 uppercase tracking-wider">{item}</span>
//                 </div>
//               ))}
//             </div>

//             <Link
//               to="/shop"
//               className="inline-flex items-center gap-4 bg-black px-10 py-4 text-white text-sm font-bold tracking-widest hover:bg-gray-800 transition-all rounded-full group"
//             >
//               BROWSE COLLECTION
//               <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* 3. ASYMMETRIC MISSION/VISION */}
//       <section className="py-24 bg-black text-white relative overflow-hidden">
//         {/* Decorative circle */}
//         <div className="absolute top-[-10%] right-[-10%] w-96 h-96 border border-white/10 rounded-full"></div>
        
//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
//             <div data-aos="fade-up">
//               <span className="text-orange-400 font-mono text-sm uppercase tracking-widest">01 / Purpose</span>
//               <h3 className="text-4xl font-heading font-bold mt-4 mb-6">Our Mission</h3>
//               <p className="text-gray-400 text-lg leading-relaxed italic">
//                 "To democratize Vastu Shastra by providing accessible, elegant, and energetically potent tools that turn every house into a sanctuary of growth."
//               </p>
//             </div>
//             <div data-aos="fade-up" data-aos-delay="200" className="md:mt-24">
//               <span className="text-blue-400 font-mono text-sm uppercase tracking-widest">02 / Future</span>
//               <h3 className="text-4xl font-heading font-bold mt-4 mb-6">Our Vision</h3>
//               <p className="text-gray-400 text-lg leading-relaxed italic">
//                 "To become the global gold standard for spiritual wellness and architectural harmony, touching 1 million lives by 2030."
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. MODERN WHY CHOOSE US */}
//       <section className="py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl font-heading font-bold">Why Vastukkalp?</h2>
//             <div className="h-1 w-20 bg-black mx-auto mt-4"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 rounded-[2rem] overflow-hidden">
//             <div className="p-12 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors group" data-aos="fade-up">
//               <FaStar className="text-2xl mb-6 group-hover:rotate-12 transition-transform" />
//               <h4 className="text-xl font-bold mb-4">Unmatched Authenticity</h4>
//               <p className="text-gray-500 text-sm leading-loose">Every product is vetted by certified Vastu experts to ensure mathematical and spiritual accuracy.</p>
//             </div>

//             <div className="p-12 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors group" data-aos="fade-up" data-aos-delay="100">
//               <FaShippingFast className="text-2xl mb-6 group-hover:translate-x-2 transition-transform" />
//               <h4 className="text-xl font-bold mb-4">Nationwide Care</h4>
//               <p className="text-gray-500 text-sm leading-loose">Securely packaged and vibration-sealed before being shipped to any corner of India.</p>
//             </div>

//             <div className="p-12 hover:bg-gray-50 transition-colors group" data-aos="fade-up" data-aos-delay="200">
//               <FaLock className="text-2xl mb-6 group-hover:scale-110 transition-transform" />
//               <h4 className="text-xl font-bold mb-4">Lifetime Trust</h4>
//               <p className="text-gray-500 text-sm leading-loose">Our relationship doesn't end at delivery. We provide ongoing guidance for your spiritual journey.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="bg-gray-50">
//         <Testimonials />
//       </div>

//       <ContactCTA />
//     </main>
//   );
// }