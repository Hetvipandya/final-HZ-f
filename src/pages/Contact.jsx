import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
    return (
        <main className="bg-[#f8f5f0] text-[#1e293b]">

            {/* HERO */}
      <section
  className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://i.pinimg.com/736x/84/16/01/84160112d68ed8b68790ab02da9c6ca9.jpg')",
  }}
>
    <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">
            Get in Touch with Holly Zolly
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Transform your space with the power of Vastu Shastra.  
            Our experts are here to guide you towards harmony, positivity, and success.
        </p>
    </div>
</section>

            {/* CONTACT SECTION */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

                    {/* LEFT SIDE */}
                    <div className="space-y-6">

                        {/* Call */}
                        <div className="p-6 rounded-xl bg-white shadow hover:scale-[1.02] transition">
                            <div className="flex gap-4 items-center">
                                <FaPhoneAlt className="text-xl text-[#c4a484]" />
                                <div>
                                    <h4 className="font-semibold">Call Us</h4>
                                    <p className="text-sm text-gray-500">
                                        Speak with our fashion consultants
                                    </p>
                                    <a href="tel:+91 99095 11961" className="hover:text-[#c4a484]">
                                        +91 99095 11961
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="p-6 rounded-xl bg-white shadow hover:scale-[1.02] transition">
                            <div className="flex gap-4 items-center">
                                <FaEnvelope className="text-xl text-[#c4a484]" />
                                <div>
                                    <h4 className="font-semibold">Email Us</h4>
                                    <p className="text-sm text-gray-500">
                                        For queries & support
                                    </p>
                                    <a href="mailto:vastukkalp2007gmail.com" className="hover:text-[#c4a484]">
                                        vastukkalp2007gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="p-6 rounded-xl bg-white shadow hover:scale-[1.02] transition">
                            <div className="flex gap-4 items-center">
                                <FaMapMarkerAlt className="text-xl text-[#c4a484]" />
                                <div>
                                    <h4 className="font-semibold">Visit Us</h4>
                                    <p className="text-gray-500">
                                        Vastukkalp
D-211 Adishwar Nagar
Nikol Road, Naroda, Ahmedabad
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE FORM */}
                    <div className="bg-white p-8 rounded-xl shadow">
                        <h3 className="text-2xl font-bold mb-2 font-serif">
                            Let’s Start a Conversation
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tell us what you need — we’ll take care of the rest.
                        </p>

                        <form className="space-y-5">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4a484]"
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4a484]"
                            />

                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#c4a484]"
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#1e293b] text-white py-3 rounded hover:bg-black transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* MAP */}
            <section className="pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-xl overflow-hidden shadow">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps?q=SG%20Highway%20Ahmedabad&output=embed"
                            className="w-full h-[400px] border-0"
                        ></iframe>
                    </div>
                </div>
            </section>

        </main>
    );
}