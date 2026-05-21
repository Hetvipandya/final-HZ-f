// import React from 'react';
// import { Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Status = () => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate('/shop');
//   }; 

//   const features = [
//     {
//       id: 1,
//       icon: <Truck className="w-10 h-10 text-white stroke-[1.5]" />,
//       title: "FREE DELIVERY",
//     },
//     {
//       id: 2,
//       icon: <RotateCcw className="w-10 h-10 text-white stroke-[1.5]" />,
//       title: "7 DAY RETURN",
//     },
//     {
//       id: 3,
//       icon: <ShieldCheck className="w-10 h-10 text-white stroke-[1.5]" />,
//       title: "100% AUTHENTIC",
//     },
//     {
//       id: 4,
//       icon: <CreditCard className="w-10 h-10 text-white stroke-[1.5]" />,
//       title: "SECURE PAYMENT",
//     },
//   ];

//   return (
//     <section className="w-full bg-[#EFEFEF] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Background waves */}
//       <div className="absolute inset-0 opacity-15 pointer-events-none hidden md:block">
//         <svg
//           className="w-full h-full text-orange-500"
//           viewBox="0 0 1440 320"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <path d="M0,160 C240,280 480,120 720,200 C960,280 1200,160 1440,220" />
//           <path d="M0,190 C240,310 480,150 720,230 C960,310 1200,190 1440,250" />
//         </svg>
//       </div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
//           {features.map((feature) => (
//             <div
//               key={feature.id}
//               className="flex flex-col items-center justify-center text-center p-4"
//             >
//               {/* Circle */}
//               <div
//                 onClick={handleNavigate}
//                 className="flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-orange-600 shadow-md transition-transform duration-300 hover:scale-105 p-4 cursor-pointer"
//               >
//                 {/* Icon */}
//                 <div className="mb-2">
//                   {feature.icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-[10px] sm:text-xs font-bold text-white tracking-wider uppercase max-w-[90px] leading-tight">
//                   {feature.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Status;

import React from 'react';
import { Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Status = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/shop');
  }; 

  const features = [
    {
      id: 1,
      icon: <Truck className="w-10 h-10 text-white stroke-[1.5]" />,
      title: "FREE DELIVERY",
    },
    {
      id: 2,
      icon: <RotateCcw className="w-10 h-10 text-white stroke-[1.5]" />,
      title: "7 DAY RETURN",
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-10 h-10 text-white stroke-[1.5]" />,
      title: "100% AUTHENTIC",
    },
    {
      id: 4,
      icon: <CreditCard className="w-10 h-10 text-white stroke-[1.5]" />,
      title: "SECURE PAYMENT",
    },
  ];

  return (
    <section className="w-full bg-[#EFEFEF] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background waves */}
      <div className="absolute inset-0 opacity-15 pointer-events-none hidden md:block">
        <svg
          className="w-full h-full text-orange-500"
          viewBox="0 0 1440 320"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M0,160 C240,280 480,120 720,200 C960,280 1200,160 1440,220" />
          <path d="M0,190 C240,310 480,150 720,230 C960,310 1200,190 1440,250" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center justify-center text-center p-4"
            >
              {/* Main Container with Relative Position */}
              <div className="relative group p-2">
                
                {/* 🔁 બોર્ડર પર કન્ટીન્યુઅસ ફરતું સર્કલ એનિમેશન */}
                <div className="absolute inset-0 w-full h-full animate-spin [animation-duration:4s] pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 180 180">
                    {/* ફરતી લાઇન અને ડોટ */}
                    <circle
                      cx="90"
                      cy="90"
                      r="82"
                      className="stroke-orange-500"
                      strokeWidth="2"
                      fill="transparent"
                      strokeDasharray="15 150" /* આનાથી બોર્ડર પર નાની લાઇન બનશે */
                      strokeLinecap="round"
                    />
                    {/* ગ્લો આપવા માટે બીજો નાનો કણ (Glow Dot) */}
                    <circle
                      cx="90"
                      cy="8"
                      r="4"
                      className="fill-orange-500 shadow-lg"
                    />
                  </svg>
                </div>

                {/* તમારું અસલી ઓરેન્જ સર્કલ */}
                <div
                  onClick={handleNavigate}
                  className="flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-orange-600 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-700 p-4 cursor-pointer relative z-10"
                >
                  {/* Icon */}
                  <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-[10px] sm:text-xs font-bold text-white tracking-wider uppercase max-w-[90px] leading-tight">
                    {feature.title}
                  </h3>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Status;