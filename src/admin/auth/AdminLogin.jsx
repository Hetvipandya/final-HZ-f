import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() { 
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="md:py-20 flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
                {/* LOGO */}
                <div className="flex items-center font-heading justify-center pb-5 gap-2">
                    <img src="/image/logo/harvon-logo.png" alt="Logo" className="h-14" />
                    <h2 className="text-4xl text-primary ">Admin Login</h2>
                </div> 



                <form className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold text-primary">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border rounded px-4 py-2 focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block mb-1 font-semibold text-primary">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create password"
                                className="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:border-primary"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded hover:bg-secondary transition font-heading" onClick={(e) => {
                            e.preventDefault();
                            toast.success("Admin Login successful");
                        }}
                    >
                        Login
                    </button>
                </form>

               
            </div>
        </section>
    );
}
