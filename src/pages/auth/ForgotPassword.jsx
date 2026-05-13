import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <section className="md:py-20 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">

        {/* LOGO */}
                <div className="flex items-center font-heading justify-center pb-5 gap-2">
                    <img src="/image/logo/harvon-logo.png" alt="Logo" className="h-14" />
                    <h2 className="text-3xl md:text-4xl text-primary "> Forgot Password</h2>
                </div>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email and we’ll send you a reset link.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold  text-primary">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded hover:bg-secondary transition font-heading"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Back to{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
