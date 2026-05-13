import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

import "swiper/css";
import "swiper/css/navigation";


AOS.init({
  duration: 800,
  once: false,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<><App /> <Toaster
  position="bottom-left"
  toastOptions={{
    duration: 3000,
  }}
/></>);
