// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ScrollToTop from "./components/ScrollToTop";
// import { Outlet } from "react-router-dom";

// export default function MainLayout() {
//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />
      
//       <Outlet />

//       <Footer />
//     </>
//   );
// }

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
      
      <WhatsAppButton />
    </>
  );
}