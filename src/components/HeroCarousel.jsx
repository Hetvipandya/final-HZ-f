// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const slides = [
//   {
//     title: "Sacred Rudraksha",
//     highlight: "Collection",
//     subtitle: "Inspired Living Collection",
//     description:
//       "Experience the divine power of authentic Rudraksha beads, believed to bring positivity, peace, protection, and spiritual balance into your life.",
//     image: "/image/banner/Frame%20r.png",
//     accent: "#C46A1A",      // warm saffron-orange
//     textColor: "#5C2D0A",   // deep brown text
//     descColor: "#7A4B21",   // soft earthy brown
//     tagBg: "#FDF2E9",       // light cream/peach tag
//     tagText: "#C46A1A",
//     btnBg: "#B85C0D",       // CTA button
//     btnText: "#ffffff",
//   },
//   {
//     title: "Sacred Yantra &",
//     highlight: "Spiritual Artworks",
//     subtitle: "🔥 LIMITED TIME DEAL 🔥",
//     description:
//       "Transform your workspace & home with Vastu-perfect handcrafted designs. Enjoy an EXTRA 15% DISCOUNT on your first order. Use Code: DIVINE15.",
//     image: "/image/banner/Frame%208.png",
//     accent: "#B8860B",       // Dark Golden for Highlights
//     textColor: "#483C32",    // Deep Taupe/Brown for visibility on Cream
//     descColor: "#5e3f40",    // Muted Brown Description
//     tagBg: "#EAD8B1",        // Creamy Beige Tag
//     tagText: "#6B4226",      // Bronze Tag text
//     btnBg: "#8B5E3C",        // Coffee Brown Button
//     btnText: "#ffffff",
//   },
//   {
//     title: "Bring Home",
//     highlight: "Blessings & Pure Positivity",
//     subtitle: "🎁 EXCLUSIVE COMBO OFFER 🎁",
//     description:
//       "Buy any 2 Premium Divine Frames and get a Sacred Ritual Kit absolutely FREE + Save up to ₹500. Offer valid till this Sunday only!",
//     image: "/image/banner/Frame%207.png",
//     accent: "#FFD700",       // Bright Gold for contrast on Orange
//     textColor: "#1A1410",    // Darker brown for better readability
//     descColor: "#3E2723",    // Deep Wood Brown description
//     tagBg: "#E65100",        // Deep Orange Tag
//     tagText: "#FFF3E0",      // Off-white/Cream Tag text
//     btnBg: "#BF360C",        // Rust Red/Deep Orange Button
//     btnText: "#ffffff",
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
//       {/* BACKGROUND IMAGE CONTAINER */}
//       <div className="hero-bg-container">
//         <img
//           key={slide.image}
//           src={slide.image}
//           alt={slide.title}
//           className="hero-bg-image"
//         />
//       </div>

//       <div className="hero-wrapper">
//         {/* CONTENT */}
//         <div key={current} className="hero-content animate-content">
//           <span
//             className="hero-tag"
//             style={{ background: slide.tagBg, color: slide.tagText }}
//           >
//             {slide.subtitle}
//           </span>

//           <h1 className="hero-title" style={{ color: slide.textColor }}>
//             {slide.title}
//             <span style={{ color: slide.accent }}>
//               <br />
//               {slide.highlight}
//             </span>
//           </h1>

//           <p className="hero-description" style={{ color: slide.descColor }}>
//             {slide.description}
//           </p>

//           <div className="hero-buttons">
//             <button
//               className="primary-btn"
//               style={{ background: slide.btnBg, color: slide.btnText }}
//               onClick={() => navigate("/shop")}
//             >
//               SHOP NOW
//             </button>
//           </div>
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
//                 current === idx
//                   ? "#111111"
//                   : "rgba(17, 17, 17, 0.4)",
//             }}
//           />
//         ))}
//       </div>

//       {/* STYLES */}
//       <style>{`
//         .spiritual-hero {
//           position: relative;
//           /* ઈમેજની હાઇટ ના વધે તે માટે આખા કમ્પોનન્ટની ઊંચાઈ અહીં સેટ કરી છે */
//           height: 75vh; 
//           width: 100%;
//           overflow: hidden;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0;
//           margin: 0;
//           background-color: #fff;
//         }

//         .hero-bg-container {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 0;
//         }

//         .hero-bg-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           opacity: 1 !important;
//           filter: none !important;
//         }

//         /* LAYOUT */
//         .hero-wrapper {
//           position: absolute;
//           z-index: 2;
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: flex-start;
//           padding-left: 8%;
//           padding-right: 2rem;
//           top: 0;
//           left: 0;
//           box-sizing: border-box;
//         }

//         .hero-content {
//           max-width: 600px;
//           animation: slideFade 0.6s cubic-bezier(0.16, 1, 0.3, 1);
//         }

//         .hero-tag {
//           display: inline-block;
//           font-size: 0.8rem;
//           letter-spacing: 1px;
//           margin-bottom: 1rem;
//           font-weight: 800;
//           padding: 5px 16px;
//           border-radius: 50px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
//         }

//         .hero-title {
//           font-size: clamp(1.8rem, 3.8vw, 3.8rem);
//           line-height: 1.2;
//           font-weight: 900;
//           text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9), 
//                        -2px -2px 4px rgba(255, 255, 255, 0.9);
//           letter-spacing: -0.5px;
//           margin: 0 0 1rem 0;
//         }

//         .hero-description {
//           font-size: clamp(0.95rem, 1.15vw, 1.15rem);
//           line-height: 1.5;
//           max-width: 500px;
//           font-weight: 600;
//           text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
//           margin: 0 0 1.5rem 0;
//         }

//         /* BUTTONS */
//         .hero-buttons {
//           display: flex;
//           gap: 16px;
//         }

//         .primary-btn {
//           border: none;
//           padding: 12px 36px;
//           border-radius: 50px;
//           font-weight: 800;
//           font-size: 0.9rem;
//           letter-spacing: 1px;
//           cursor: pointer;
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
//           transition: all 0.3s ease;
//         }

//         .primary-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
//           opacity: 0.95;
//         }

//         /* DOTS */
//         .slider-dots {
//           position: absolute;
//           bottom: 25px;
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           gap: 12px;
//           z-index: 5;
//         }

//         .dot {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           border: 1px solid rgba(255,255,255,0.5);
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
//           padding: 0;
//         }

//         .dot.active {
//           width: 30px;
//           border-radius: 999px;
//         }

//         /* ANIMATION */
//         @keyframes slideFade {
//           from {
//             opacity: 0;
//             transform: translateY(12px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* RESPONSIVE BREAKPOINTS */
//         @media (max-width: 1024px) {
//           .spiritual-hero {
//             height: 65vh; /* ટેબ્લેટ પર હાઇટ પ્રમાણસર નાની થશે */
//           }
//           .hero-wrapper {
//             padding-left: 5%;
//           }
//           .hero-content {
//             max-width: 500px;
//           }
//         }

//         @media (max-width: 768px) {
//           .spiritual-hero {
//             height: auto; /* મોબાઈલમાં લખાણ કટ ન થાય એટલે હાઇટ કન્ટેન્ટ પ્રમાણે ઓટોમેટીક એડજસ્ટ થશે */
//             min-height: 550px; 
//             padding: 4rem 0;
//           }
//           .hero-overlay {
//             background: rgba(255, 255, 255, 0.6);
//             backdrop-filter: blur(2px);
//           }
//           .hero-wrapper {
//             position: relative; /* સ્ટેટિક ફ્લો જેથી ઈમેજની બહાર કન્ટેન્ટ ના જાય */
//             justify-content: center;
//             text-align: center;
//             padding: 2rem 1.5rem;
//           }
//           .hero-content {
//             max-width: 100%;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//           }
//           .hero-title {
//             text-shadow: 0px 0px 8px rgba(255, 255, 255, 1);
//           }
//           .hero-description {
//             text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
//           }
//           .hero-buttons {
//             width: 100%;
//             max-width: 260px;
//             justify-content: center;
//           }
//           .primary-btn {
//             width: 100%;
//           }
//           .slider-dots {
//             bottom: 20px;
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
    title: "Sacred Rudraksha",
    highlight: "Collection",
    subtitle: "Inspired Living Collection",
    description:
      "Experience the divine power of authentic Rudraksha beads, believed to bring positivity, peace, protection, and spiritual balance into your life.",

    image: "/image/banner/Frame%20r.png",
    mobileImage: "/image/banner/r1.png",

    // Navigation Path
    path: "/shop?category=RUDRAKSH",

    accent: "#B8860B",
    textColor: "#483C32",
    descColor: "#86040b",
    tagBg: "#EAD8B1",
    tagText: "#6B4226",
    btnBg: "#8B5E3C",
    btnText: "#ffffff",
  },
  {
    title: "Powerful Aayudh",
    highlight: "Protection Frames",
    subtitle: "✨ INVITE POSITIVE ENERGY ✨",
    description:
      "Beautify your space with spiritual Vastu artworks that bring harmony, positivity, and peaceful energy.",

    image: "/image/banner/Frame%208.png",
    mobileImage: "/image/banner/r2.png",

    // Navigation Path
    path: "/shop?category=AAYUDH FRAME",

    accent: "#B8860B",
    textColor: "#483C32",
    descColor: "#86040b",
    tagBg: "#EAD8B1",
    tagText: "#6B4226",
    btnBg: "#8B5E3C",
    btnText: "#ffffff",
  },
  {
    title: "Mangal Yantra",
    highlight: "Blessings & Spiritual Strength",
    subtitle: "🎁 EXCLUSIVE COMBO OFFER 🎁",
    description:
      "Buy any 2 Premium Divine Frames and get a Sacred Ritual Kit absolutely FREE + Save up to ₹500. Offer valid till this Sunday only!",

    image: "/image/banner/Frame%207.png",
    mobileImage: "/image/banner/r3.png",

    // Navigation Path
    path: "/shop?category=YANTRA",

    accent: "#B8860B",
    textColor: "#483C32",
    descColor: "#86040b",
    tagBg: "#EAD8B1",
    tagText: "#6B4226",
    btnBg: "#8B5E3C",
    btnText: "#ffffff",
  },
];

export default function SpiritualHero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  const navigate = useNavigate();

  // Auto slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const slide = slides[current];

  return (
    <section className="spiritual-hero">
      {/* Background Image */}
      <div className="hero-bg-container">
        <img
          key={
            isMobile
              ? slide.mobileImage
              : slide.image
          }
          src={
            isMobile
              ? slide.mobileImage
              : slide.image
          }
          alt={slide.title}
          className="hero-bg-image"
        />
      </div>

      {/* Content */}
      <div className="hero-wrapper">
        <div
          key={current}
          className="hero-content animate-content"
        >
          <span
            className="hero-tag"
            style={{
              background: slide.tagBg,
              color: slide.tagText,
            }}
          >
            {slide.subtitle}
          </span>

          <h1
            className="hero-title"
            style={{
              color: slide.textColor,
            }}
          >
            {slide.title}
            <span
              style={{
                color: slide.accent,
              }}
            >
              <br />
              {slide.highlight}
            </span>
          </h1>

          <p
            className="hero-description"
            style={{
              color: slide.descColor,
            }}
          >
            {slide.description}
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              style={{
                background: slide.btnBg,
                color: slide.btnText,
              }}
              onClick={() =>
                navigate(slide.path)
              }
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="slider-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`dot ${
              current === idx
                ? "active"
                : ""
            }`}
          />
        ))}
      </div>

      <style>{`
        .spiritual-hero {
          position: relative;
          width: 100%;
          height: 75vh;
          overflow: hidden;
        }

        .hero-bg-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-wrapper {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 8%;
          padding-right: 2rem;
        }

        .hero-content {
          max-width: 580px;
          animation: slideFade 0.6s ease;
        }

        .hero-tag {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: clamp(2rem, 4vw, 4rem);
          line-height: 1.2;
          font-weight: 900;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 5px rgba(255,255,255,0.9);
        }

        .hero-description {
          font-size: 1rem;
          line-height: 1.6;
          font-weight: 600;
          max-width: 500px;
          margin-bottom: 1.5rem;
          text-shadow: 1px 1px 4px rgba(255,255,255,0.9);
        }

        .primary-btn {
          border: none;
          padding: 12px 34px;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
        }

        .slider-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: none;
          background: rgba(0,0,0,0.3);
          cursor: pointer;
          transition: 0.3s;
        }

        .dot.active {
          width: 30px;
          background: #111;
        }

        @keyframes slideFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet */
       @media (max-width: 1024px) {
  .spiritual-hero {
    height: 60vh;
  }

  .hero-wrapper {
    padding-left: 5%;
    padding-right: 5%;
  }

  .hero-content {
    max-width: 420px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }
}

        /* Mobile */
@media (max-width: 768px) {
  .spiritual-hero {
    height: 100%;
    min-height: 500px;
    position: relative;
  }

  .hero-bg-image {
    object-fit: cover;
    object-position: center;
  }

  .hero-wrapper {
    position: relative;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 20px 20px;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
  }

  .hero-content {
    max-width: 85%;
    text-align: left;
    margin-top: 0px;
    padding-top: 20px;
  }

  .hero-tag {
    font-size: 0.7rem;
    padding: 5px 12px;
    margin-bottom: 0.8rem;
  }

  .hero-title {
    font-size: clamp(1.5rem, 5vw, 2rem);
    line-height: 1.2;
    margin-bottom: 0.8rem;
  }

  .hero-description {
    font-size: 0.82rem;
    line-height: 1.5;
    max-width: 100%;
    margin-bottom: 1rem;
  }

  .primary-btn {
    padding: 10px 20px;
    font-size: 0.8rem;
  }

  .slider-dots {
    bottom: 12px;
  }
}
  @media (max-width: 480px) {
  .spiritual-hero {
    min-height: 380px;
  }

  .hero-content {
    max-width: 65%;
  }

  .hero-title {
    font-size: 1.3rem;
  }

  .hero-description {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  .primary-btn {
    padding: 8px 16px;
    font-size: 0.75rem;
  }
}
      `}</style>
    </section>
  );
}