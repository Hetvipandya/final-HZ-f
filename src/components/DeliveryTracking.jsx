// import {
//   FaBox,
//   FaShippingFast,
//   FaTruck,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaUndoAlt,
// } from "react-icons/fa";

// const steps = [
//   {
//     key: "pending",
//     label: "Order Placed",
//     icon: FaBox,
//   },
//   {
//     key: "shipped",
//     label: "Shipped",
//     icon: FaShippingFast,
//   },
//   {
//     key: "out-for-delivery",
//     label: "Out for Delivery",
//     icon: FaTruck,
//   },
//   {
//     key: "delivered",
//     label: "Delivered",
//     icon: FaCheckCircle,
//   },
// ];

// export default function DeliveryTracking({ status }) {
//   // Cancelled or Returned special case
//   if (status === "cancelled" || status === "returned") {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow">
//         <div className="flex items-center gap-4 text-red-600">
//           {status === "cancelled" ? (
//             <FaTimesCircle className="text-3xl" />
//           ) : (
//             <FaUndoAlt className="text-3xl" />
//           )}
//           <div>
//             <h3 className="font-heading font-semibold text-lg capitalize">
//               Order {status}
//             </h3>
//             <p className="text-sm text-gray-600">
//               This order has been {status}.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentStepIndex = steps.findIndex(
//     (step) => step.key === status
//   );

//   return (
//     <div className="bg-white p-6 rounded-lg shadow ">
//       <h3 className="font-heading font-semibold text-xl mb-6 text-primary">
//         Delivery Tracking
//       </h3> 

//       <div className="relative flex justify-between">
//         {steps.map((step, index) => {
//           const Icon = step.icon;
//           const isCompleted = index <= currentStepIndex;

//           return (
//             <div
//               key={step.key}
//               className="flex flex-col items-center flex-1 relative"
//             >
//               {/* LINE */}
//               {index !== 0 && (
//                 <div
//                   className={`absolute top-4 left-0 w-full h-1 -z-10 ${
//                     isCompleted ? "bg-primary" : "bg-gray-300"
//                   }`}
//                 />
//               )}

//               {/* ICON */}
//               <div
//                 className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                   isCompleted
//                     ? "bg-primary text-white"
//                     : "bg-gray-200 text-gray-400"
//                 }`}
//               >
//                 <Icon />
//               </div>

//               {/* LABEL */}
//               <p
//                 className={`mt-2 text-sm text-center font-semibold ${
//                   isCompleted ? "text-primary" : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import {
  FaBox,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaUndoAlt,
} from "react-icons/fa";

const steps = [
  {
    key: "pending",
    label: "Order Placed",
    icon: FaBox,
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: FaShippingFast,
  },
  {
    key: "out-for-delivery",
    label: "Out for Delivery",
    icon: FaTruck,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: FaCheckCircle,
  },
];

export default function DeliveryTracking({ status }) {
  // Cancelled or Returned special case
  if (status === "cancelled" || status === "returned") {
    return (
      <div className="bg-white p-8 rounded-[2rem] border border-red-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 h-full w-2 bg-red-500"></div>
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
            {status === "cancelled" ? <FaTimesCircle /> : <FaUndoAlt />}
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-black capitalize">
              Order {status}
            </h3>
            <p className="text-gray-500 leading-relaxed">
              We're sorry, but this order has been {status}. Please contact support for further assistance.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-heading font-bold text-xl text-black">
          Track <span className="text-orange-600 italic">Vastu</span> Journey
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          Live Status
        </span>
      </div>

      <div className="relative flex justify-between items-start">
        {/* BACKGROUND LINE (THE TRACK) */}
        <div className="absolute top-7 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full" />
        
        {/* ACTIVE PROGRESS LINE */}
        <div 
          className="absolute top-7 left-0 h-1 bg-orange-600 transition-all duration-1000 ease-out z-0 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.4)]"
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center flex-1 relative z-10"
            >
              {/* ICON CIRCLE */}
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 shadow-xl ${
                  isCompleted
                    ? "bg-black text-white border-white"
                    : "bg-white text-gray-300 border-gray-50"
                } ${isCurrent ? "ring-4 ring-orange-100 scale-110 bg-orange-600 border-white" : ""}`}
              >
                <Icon size={isCurrent ? 24 : 20} className={`${isCurrent ? "animate-pulse" : ""}`} />
              </div>

              {/* LABEL BOX */}
              <div className="mt-4 text-center">
                <p
                  className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-500 ${
                    isCompleted ? "text-black" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-[9px] font-extrabold rounded-md uppercase">
                    Processing
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}