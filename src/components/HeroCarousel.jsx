// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const slides = [
//   {
//     title: "Balanced Spaces",
//     highlight: "Positive Energy",
//     subtitle: "Inspired Living Collection",
//     description:
//       "Discover thoughtfully crafted products designed to bring harmony, peace, and elegance into modern homes and workplaces.",
//     image:
//       "https://res.cloudinary.com/domq86row/image/upload/v1778251631/WhatsApp_Image_2026-05-04_at_3.13.11_PM_sdynan.jpg",
//     accent: "#d4a017",
//     light: "#fef3c7",
//     dark: "#78350f",
//   },
//   {
//     title: "Sacred Design",
//     highlight: "Timeless Traditions",
//     subtitle: "Modern Spiritual Decor",
//     description:
//       "A premium collection blending traditional inspiration with contemporary aesthetics for meaningful interiors.",
//     image:
//       "https://res.cloudinary.com/domq86row/image/upload/v1778251631/WhatsApp_Image_2026-05-04_at_3.13.17_PM_z5ohlv.jpg",
//     accent: "#0f766e",
//     light: "#ccfbf1",
//     dark: "#134e4a",
//   },
//   {
//     title: "Elevate Every",
//     highlight: "Corner",
//     subtitle: "Luxury Wellness Essentials",
//     description:
//       "Create calm and uplifting environments with artistic elements crafted to inspire positivity and refined living.",
//     image:
//       "https://res.cloudinary.com/domq86row/image/upload/v1778251631/WhatsApp_Image_2026-05-04_at_3.13.23_PM_snrp8o.jpg",
//     accent: "#7c3aed",
//     light: "#ede9fe",
//     dark: "#4c1d95",
//   },
// ];

// export default function SpiritualHero() {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const slide = slides[current];

//   return (
//     <section className="spiritual-hero">
//       {/* BACKGROUND */}
//       <div className="vastu-background">
//         <div className="mandala mandala-one"></div>
//         <div className="mandala mandala-two"></div>
//         <div className="yantra-grid"></div>
//         <div className="spiritual-glow"></div>

//         {/* Floating Particles */}
//         <span className="particle p1"></span>
//         <span className="particle p2"></span>
//         <span className="particle p3"></span>
//         <span className="particle p4"></span>
//       </div>

//       <div className="hero-wrapper">
//         {/* LEFT */}
//         <div key={current} className="hero-content animate-content">
//           <span
//             className="hero-tag"
//             style={{
//               background: slide.light,
//               color: slide.dark,
//             }}
//           >
//             ✨ {slide.subtitle}
//           </span>

//           <h1 className="hero-title">
//             {slide.title}
//             <span style={{ color: slide.accent }}>
//               <br />
//               {slide.highlight}
//             </span>
//           </h1>

//           <p className="hero-description">{slide.description}</p>

//           <div className="hero-buttons">
//             <button
//               className="primary-btn"
//               style={{ background: slide.accent }}
//               onClick={() => navigate("/shop")}
//             >
//               Explore Collection
//             </button>

//             <button
//               className="secondary-btn"
//               style={{
//                 borderColor: slide.accent,
//                 color: slide.accent,
//               }}
//               onClick={() => navigate("/contact")}
//             >
//               Connect With Us
//             </button>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div key={slide.image} className="hero-image-section animate-image">
//           <div
//             className="image-card"
//             style={{
//               borderColor: `${slide.accent}30`,
//             }}
//           >
//             <div
//               className="image-overlay"
//               style={{
//                 background: `linear-gradient(to top, ${slide.accent}20, transparent)`,
//               }}
//             ></div>

//             <img src={slide.image} alt={slide.title} />
//           </div>

//           <div
//             className="floating floating-one"
//             style={{ background: slide.light }}
//           ></div>

//           <div
//             className="floating floating-two"
//             style={{ background: `${slide.accent}20` }}
//           ></div>
//         </div>
//       </div>

//       {/* DOTS */}
//       <div className="slider-dots">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrent(idx)}
//             className={`dot ${current === idx ? "active" : ""}`}
//             style={{
//               background:
//                 current === idx ? slide.accent : "rgba(148,163,184,0.4)",
//             }}
//           />
//         ))}
//       </div>

//       <style jsx>{`
//         .spiritual-hero {
//           position: relative;
//           min-height: 100vh;
//           overflow: hidden;
//           background: linear-gradient(to bottom right, #ffffff, #fffdf8);
//           display: flex;
//           align-items: center;
//           padding: 5rem 2rem;
//         }

//         /* BACKGROUND */
//         .vastu-background {
//           position: absolute;
//           inset: 0;
//           overflow: hidden;
//           z-index: 0;
//           pointer-events: none;
//         }

//         .mandala {
//           position: absolute;
//           border-radius: 50%;
//           opacity: 0.08;
//           animation: rotateMandala 30s linear infinite;
//         }

//         .mandala-one {
//           width: 520px;
//           height: 520px;
//           top: -120px;
//           right: -100px;
//           background:
//             radial-gradient(circle, transparent 58%, #d4a017 60%, transparent 62%),
//             radial-gradient(circle, transparent 48%, #f59e0b 50%, transparent 52%),
//             radial-gradient(circle, transparent 38%, #fbbf24 40%, transparent 42%);
//         }

//         .mandala-two {
//           width: 380px;
//           height: 380px;
//           bottom: -80px;
//           left: -80px;
//           background:
//             radial-gradient(circle, transparent 58%, #7c3aed 60%, transparent 62%),
//             radial-gradient(circle, transparent 48%, #a855f7 50%, transparent 52%),
//             radial-gradient(circle, transparent 38%, #c084fc 40%, transparent 42%);
//           animation-direction: reverse;
//         }

//         .yantra-grid {
//           position: absolute;
//           inset: 0;
//           opacity: 0.04;
//           background-image:
//             linear-gradient(rgba(212,160,23,0.3) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(212,160,23,0.3) 1px, transparent 1px);
//           background-size: 60px 60px;
//         }

//         .spiritual-glow {
//           position: absolute;
//           width: 700px;
//           height: 700px;
//           background: radial-gradient(
//             circle,
//             rgba(245, 158, 11, 0.15),
//             transparent 70%
//           );
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           filter: blur(40px);
//           animation: pulseGlow 5s ease-in-out infinite;
//         }

//         /* PARTICLES */
//         .particle {
//           position: absolute;
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background: rgba(255, 193, 7, 0.4);
//           animation: floatParticle 12s linear infinite;
//         }

//         .p1 {
//           left: 10%;
//           top: 90%;
//           animation-delay: 0s;
//         }

//         .p2 {
//           left: 30%;
//           top: 95%;
//           animation-delay: 3s;
//         }

//         .p3 {
//           left: 70%;
//           top: 92%;
//           animation-delay: 6s;
//         }

//         .p4 {
//           left: 90%;
//           top: 96%;
//           animation-delay: 9s;
//         }

//         /* LAYOUT */
//         .hero-wrapper {
//           max-width: 1300px;
//           margin: auto;
//           width: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 5rem;
//           position: relative;
//           z-index: 2;
//           flex-wrap: wrap;
//         }

//         .hero-content {
//           flex: 1;
//           min-width: 320px;
//         }

//         .hero-tag {
//           display: inline-block;
//           padding: 0.7rem 1.2rem;
//           border-radius: 999px;
//           font-size: 0.8rem;
//           font-weight: 600;
//           margin-bottom: 1.8rem;
//         }

//         .hero-title {
//           font-size: clamp(2.8rem, 5vw, 5rem);
//           line-height: 1.1;
//           color: #0f172a;
//           margin-bottom: 1.5rem;
//           font-weight: 800;
//         }

//         .hero-description {
//           font-size: 1.05rem;
//           line-height: 1.9;
//           color: #64748b;
//           max-width: 580px;
//           margin-bottom: 2.5rem;
//         }

//         /* BUTTONS */
//         .hero-buttons {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//         }

//         .primary-btn,
//         .secondary-btn {
//           padding: 0.95rem 2rem;
//           border-radius: 14px;
//           font-size: 0.95rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: 0.3s ease;
//         }

//         .primary-btn {
//           border: none;
//           color: white;
//           animation: pulseButton 2s infinite;
//         }

//         .primary-btn:hover,
//         .secondary-btn:hover {
//           transform: translateY(-4px) scale(1.02);
//         }

//         .secondary-btn {
//           background: white;
//           border: 1px solid;
//         }

//         /* IMAGE */
//         .hero-image-section {
//           flex: 1;
//           min-width: 320px;
//           position: relative;
//           display: flex;
//           justify-content: center;
//         }

//         .image-card {
//           position: relative;
//           width: 100%;
//           max-width: 500px;
//           border-radius: 32px;
//           overflow: hidden;
//           border: 1px solid;
//           background: white;
//           box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
//           animation: floatingCard 5s ease-in-out infinite;
//         }

//         .image-card img {
//           width: 100%;
//           display: block;
//           object-fit: cover;
//           transition: transform 0.6s ease;
//         }

//         .image-card:hover img {
//           transform: scale(1.08);
//         }

//         .image-overlay {
//           position: absolute;
//           inset: 0;
//           z-index: 2;
//         }

//         .floating {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(15px);
//           z-index: -1;
//           animation: floatingOrb 8s ease-in-out infinite;
//         }

//         .floating-one {
//           width: 140px;
//           height: 140px;
//           top: -30px;
//           right: 10%;
//         }

//         .floating-two {
//           width: 180px;
//           height: 180px;
//           bottom: -40px;
//           left: 0;
//           animation-delay: 2s;
//         }

//         /* DOTS */
//         .slider-dots {
//           position: absolute;
//           bottom: 2rem;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           gap: 0.6rem;
//           z-index: 5;
//         }

//         .dot {
//           width: 10px;
//           height: 10px;
//           border: none;
//           border-radius: 50px;
//           cursor: pointer;
//           transition: 0.4s ease;
//         }

//         .dot.active {
//           width: 32px;
//         }

//         /* ANIMATIONS */
//         .animate-content {
//           animation: slideFade 0.8s ease;
//         }

//         .animate-image {
//           animation: zoomFade 1s ease;
//         }

//         @keyframes slideFade {
//           from {
//             opacity: 0;
//             transform: translateY(40px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes zoomFade {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         @keyframes rotateMandala {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes floatingCard {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-12px);
//           }
//         }

//         @keyframes floatingOrb {
//           0%,
//           100% {
//             transform: translateY(0px) scale(1);
//           }
//           50% {
//             transform: translateY(-25px) scale(1.1);
//           }
//         }

//         @keyframes pulseGlow {
//           0%,
//           100% {
//             opacity: 0.6;
//             transform: translate(-50%, -50%) scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: translate(-50%, -50%) scale(1.1);
//           }
//         }

//         @keyframes pulseButton {
//           0%,
//           100% {
//             box-shadow: 0 0 0 rgba(0, 0, 0, 0);
//           }
//           50% {
//             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
//           }
//         }

//         @keyframes floatParticle {
//           0% {
//             transform: translateY(0) scale(0);
//             opacity: 0;
//           }
//           20% {
//             opacity: 1;
//             transform: scale(1);
//           }
//           100% {
//             transform: translateY(-100vh) scale(0.5);
//             opacity: 0;
//           }
//         }

//         /* RESPONSIVE */
//         @media (max-width: 900px) {
//           .hero-wrapper {
//             flex-direction: column-reverse;
//             text-align: center;
//             gap: 3rem;
//           }

//           .hero-buttons {
//             justify-content: center;
//           }
//         }

//         @media (max-width: 768px) {
//           .mandala-one {
//             width: 320px;
//             height: 320px;
//           }

//           .mandala-two {
//             width: 240px;
//             height: 240px;
//           }

//           .spiritual-glow {
//             width: 400px;
//             height: 400px;
//           }
//         }

//         @media (max-width: 480px) {
//           .spiritual-hero {
//             padding: 4rem 1.2rem;
//           }

//           .hero-title {
//             font-size: 2.3rem;
//           }

//           .primary-btn,
//           .secondary-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Balanced Spaces",
    highlight: "Positive Energy",
    subtitle: "Inspired Living Collection",
    description:
      "Discover thoughtfully crafted products designed to bring harmony, peace, and elegance into modern homes and workplaces.",
    image:
      "https://res.cloudinary.com/domq86row/image/upload/v1778251631/WhatsApp_Image_2026-05-04_at_3.13.11_PM_sdynan.jpg",
    accent: "#d4a017",
    light: "#fef3c7",
    dark: "#78350f",
  },
  {
    title: "Sacred Design",
    highlight: "Timeless Traditions",
    subtitle: "Modern Spiritual Decor",
    description:
      "A premium collection blending traditional inspiration with contemporary aesthetics for meaningful interiors.",
    image:
      "https://res.cloudinary.com/domq86row/image/upload/v1778251631/WhatsApp_Image_2026-05-04_at_3.13.17_PM_z5ohlv.jpg",
    accent: "#0f766e",
    light: "#ccfbf1",
    dark: "#134e4a",
  },
  {
    title: "Elevate Every",
    highlight: "Corner",
    subtitle: "Luxury Wellness Essentials",
    description:
      "Create calm and uplifting environments with artistic elements crafted to inspire positivity and refined living.",
    image:
      "https://res.cloudinary.com/domq86row/image/upload/v1778251631/WhatsApp_Image_2026-05-04_at_3.13.23_PM_snrp8o.jpg",
    accent: "#7c3aed",
    light: "#ede9fe",
    dark: "#4c1d95",
  },
];

export default function SpiritualHero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="spiritual-hero">
      {/* BACKGROUND */}
      <div className="vastu-background">
        <div className="mandala mandala-one"></div>
        <div className="mandala mandala-two"></div>
        <div className="yantra-grid"></div>
        <div className="spiritual-glow"></div>

        <span className="particle p1"></span>
        <span className="particle p2"></span>
        <span className="particle p3"></span>
        <span className="particle p4"></span>
      </div>

      <div className="hero-wrapper">
        {/* LEFT */}
        <div key={current} className="hero-content animate-content">
          <span
            className="hero-tag"
            style={{ background: slide.light, color: slide.dark }}
          >
            ✨ {slide.subtitle}
          </span>

          <h1 className="hero-title">
            {slide.title}
            <span style={{ color: slide.accent }}>
              <br />
              {slide.highlight}
            </span>
          </h1>

          <p className="hero-description">{slide.description}</p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              style={{ background: slide.accent }}
              onClick={() => navigate("/shop")}
            >
              Explore Collection
            </button>

            <button
              className="secondary-btn"
              style={{
                borderColor: slide.accent,
                color: slide.accent,
              }}
              onClick={() => navigate("/contact")}
            >
              Connect With Us
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div key={slide.image} className="hero-image-section animate-image">
          <div
            className="image-card"
            style={{ borderColor: `${slide.accent}30` }}
          >
            <div
              className="image-overlay"
              style={{
                background: `linear-gradient(to top, ${slide.accent}20, transparent)`,
              }}
            ></div>

            <img src={slide.image} alt={slide.title} />
          </div>

          <div
            className="floating floating-one"
            style={{ background: slide.light }}
          ></div>

          <div
            className="floating floating-two"
            style={{ background: `${slide.accent}20` }}
          ></div>
        </div>
      </div>

      {/* DOTS */}
      <div className="slider-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`dot ${current === idx ? "active" : ""}`}
            style={{
              background:
                current === idx
                  ? slide.accent
                  : "rgba(148,163,184,0.4)",
            }}
          />
        ))}
      </div>

      {/* STYLE */}
      <style jsx>{`
        .spiritual-hero {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: linear-gradient(to bottom right, #fff, #fffdf8);
          display: flex;
          align-items: center;
          padding: 5rem 2rem;
        }

        /* BACKGROUND */
        .vastu-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .mandala {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
          animation: rotateMandala 30s linear infinite;
        }

        .mandala-one {
          width: 520px;
          height: 520px;
          top: -120px;
          right: -100px;
          background: radial-gradient(circle, transparent 58%, #d4a017 60%);
        }

        .mandala-two {
          width: 380px;
          height: 380px;
          bottom: -80px;
          left: -80px;
          animation-direction: reverse;
          background: radial-gradient(circle, transparent 58%, #7c3aed 60%);
        }

        .yantra-grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: linear-gradient(#d4a01733 1px, transparent 1px),
            linear-gradient(90deg, #d4a01733 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .spiritual-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.15), transparent);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px);
        }

        /* LAYOUT */
        .hero-wrapper {
          max-width: 1200px;
          margin: auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
          z-index: 2;
          flex-wrap: wrap;
        }

        .hero-content {
          flex: 1;
          min-width: 280px;
        }

        .hero-tag {
          display: inline-block;
          padding: 0.6rem 1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: clamp(2rem, 4vw, 4.5rem);
          line-height: 1.1;
          font-weight: 800;
          color: #0f172a;
        }

        .hero-description {
          margin-top: 1.2rem;
          font-size: 1rem;
          color: #64748b;
          max-width: 520px;
        }

        /* BUTTONS */
        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          padding: 0.9rem 1.8rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .primary-btn {
          border: none;
          color: white;
        }

        .secondary-btn {
          background: white;
          border: 1px solid;
        }

        .primary-btn:hover,
        .secondary-btn:hover {
          transform: translateY(-3px);
        }

        /* IMAGE */
        .hero-image-section {
          flex: 1;
          min-width: 280px;
          display: flex;
          justify-content: center;
        }

        .image-card {
          width: 100%;
          max-width: 450px;
          border-radius: 28px;
          overflow: hidden;
          background: white;
          border: 1px solid;
        }

        .image-card img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* DOTS */
        .slider-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
        }

        .dot.active {
          width: 28px;
          border-radius: 20px;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .hero-wrapper {
            flex-direction: column-reverse;
            text-align: center;
          }

          .hero-description {
            margin: auto;
          }

          .hero-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .spiritual-hero {
            padding: 3rem 1rem;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}