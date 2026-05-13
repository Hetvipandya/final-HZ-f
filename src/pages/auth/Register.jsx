// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import {
//   FaEye,
//   FaEyeSlash,
//   FaUser,
//   FaEnvelope,
//   FaArrowRight,
// } from "react-icons/fa";
// import { client } from "../../lib/sanity";

// export default function Register() {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "phone") {
//       const cleaned = value.replace(/\D/g, "").slice(0, 10);
//       setForm({ ...form, phone: cleaned });
//       return;
//     }

//     setForm({ ...form, [name]: value });
//   };

//   const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
//   const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

//   // 🚀 REGISTER WITH SANITY
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const name = form.name.trim();
//     const email = form.email.trim();
//     const password = form.password;
//     const confirmPassword = form.confirmPassword;
//     const phone = form.phone.trim();

//     if (!name || !email || !phone || !password || !confirmPassword) {
//       toast.error("⚠️ All fields are required");
//       return;
//     }

//     if (!isValidEmail(email)) {
//       toast.error("⚠️ Invalid email format");
//       return;
//     }

//     if (!isValidPhone(phone)) {
//       toast.error("⚠️ Invalid phone number");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("⚠️ Password must be at least 6 characters");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("⚠️ Passwords do not match");
//       return;
//     }

//     try {
//       // ✅ CHECK USER EXISTS IN SANITY
//       const existingUser = await client.fetch(
//         `*[_type == "profile" && email == $email][0]`,
//         { email }
//       );

//       if (existingUser) {
//         toast.error("⚠️ User already exists");
//         return;
//       }

//       // ✅ SAVE TO SANITY
//       const response = await client.create({
//         _type: "profile",
//         fullName: name,
//         email: email,
//         phone: phone,
//         password: password,
//       });

//       // ✅ OPTIONAL localStorage (keep your flow same)
//       const newUser = {
//         id: response._id,
//         name,
//         email,
//         phone,
//       };

//       localStorage.setItem("currentUser", JSON.stringify(newUser));

//       toast.success("🎉 Account created & saved to Sanity!");

//       setTimeout(() => {
//         navigate("/");
//       }, 800);

//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Error saving to Sanity");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-[#FCFBFA] py-16 px-6 relative overflow-hidden">

//       <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full -mr-48 -mt-48 blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full -ml-48 -mb-48 blur-3xl"></div>

//       <div className="bg-white rounded-[3rem] shadow-[0_20px_70px_rgba(0,0,0,0.03)] border border-gray-100 w-full max-w-xl overflow-hidden flex flex-col md:flex-row relative z-10">

//         <div className="hidden lg:flex w-2/5 bg-black p-12 text-white flex-col justify-between">
//           <div>
//             <h2 className="text-3xl font-bold mt-10 leading-tight">
//               Begin Your <br />
//               <span className="text-orange-500 italic">Spiritual</span> Journey.
//             </h2>
//           </div>
//           <p className="text-gray-400 text-xs uppercase font-bold">
//             Vastukkalp © 2026
//           </p>
//         </div>

//         <div className="flex-1 p-8 md:p-12">

//           <div className="mb-10">
//             <h1 className="text-3xl font-bold text-black">
//               Create <span className="text-orange-600 italic">Account</span>
//             </h1>
//             <p className="text-gray-400 text-sm">
//               Join the community of Vastu experts.
//             </p>
//           </div>

//           <form className="space-y-6" onSubmit={handleRegister}>

//             <div>
//               <label className="text-xs text-gray-400 flex items-center gap-2">
//                 <FaUser size={10} /> Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="text-xs text-gray-400 flex items-center gap-2">
//                 <FaEnvelope size={10} /> Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="example@gmail.com"
//                 className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="text-xs text-gray-400 flex items-center gap-2">
//                 📞 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="**********"
//                 maxLength={10}
//                 className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div className="space-y-4">

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-400"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>

//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm Password"
//                   className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-3 text-gray-400"
//                 >
//                   {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>

//             </div>

//             <button className="w-full bg-black text-white py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-orange-600 transition">
//               Sign Up <FaArrowRight />
//             </button>

//           </form>

//           <p className="text-center mt-6 text-sm text-gray-400">
//             Already have an account?{" "}
//             <Link to="/login" className="text-black font-bold">
//               Login
//             </Link>
//           </p>

//         </div>
//       </div>
//     </section>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import BASE_URL from "../../BASEURL";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setForm({ ...form, phone: cleaned });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  // 🚀 REGISTER WITH BACKEND (MONGODB)
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = form;

    if (!name || !email || !phone || !password || !confirmPassword) {
      return toast.error("⚠️ All fields are required");
    }

    if (!isValidEmail(email)) return toast.error("⚠️ Invalid email format");
    if (!isValidPhone(phone)) return toast.error("⚠️ Invalid phone number");
    if (password.length < 6)
      return toast.error("⚠️ Password must be at least 6 characters");
    if (password !== confirmPassword)
      return toast.error("⚠️ Passwords do not match");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Registration failed");
      }

      toast.success("🎉 Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("❌ Server error");
    }
  };

  return (
    // 🔥 SAME DESIGN (NO CHANGE AT ALL)
    <section className="min-h-screen flex items-center justify-center bg-[#FCFBFA] py-16 px-6 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="bg-white rounded-[3rem] shadow-[0_20px_70px_rgba(0,0,0,0.03)] border border-gray-100 w-full max-w-xl overflow-hidden flex flex-col md:flex-row relative z-10">

        <div className="hidden lg:flex w-2/5 bg-black p-12 text-white flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mt-10 leading-tight">
              Begin Your <br />
              <span className="text-orange-500 italic">Spiritual</span> Journey.
            </h2>
          </div>
          <p className="text-gray-400 text-xs uppercase font-bold">
            Vastukkalp © 2026
          </p>
        </div>

        <div className="flex-1 p-8 md:p-12">

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-black">
              Create <span className="text-orange-600 italic">Account</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Join the community of Vastu experts.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>

            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                <FaUser size={10} /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                <FaEnvelope size={10} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                📞 Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="**********"
                maxLength={10}
                className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-4">

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-orange-600 transition"
            >
              Sign Up <FaArrowRight />
            </button>

          </form>

          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}