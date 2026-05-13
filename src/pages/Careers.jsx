import { useState } from "react";

export default function Careers() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Career Form Data:", form);
    alert("Application submitted successfully!");
    setForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
      resume: null,
    });
  };

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(2,6,23,0.7), rgba(2,6,23,0.7)), url('/image/about/breadcrumb-bg.jpg')",
        }}
      >
        <div className="text-center text-white px-6" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            Careers at HARVON
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-200">
            Join our team and help shape the future of modern fashion.
          </p>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-6" data-aos="fade-up">
            Why Work With Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 border rounded-lg" data-aos="zoom-in">
              <h4 className="font-semibold mb-2">Growth & Learning</h4>
              <p className="text-sm text-gray-600">
                Opportunities to grow your skills in a fast-paced environment.
              </p>
            </div>

            <div className="p-6 border rounded-lg" data-aos="zoom-in" data-aos-delay="100">
              <h4 className="font-semibold mb-2">Creative Culture</h4>
              <p className="text-sm text-gray-600">
                Work with passionate people who value creativity and ideas.
              </p>
            </div>

            <div className="p-6 border rounded-lg" data-aos="zoom-in" data-aos-delay="200">
              <h4 className="font-semibold mb-2">Career Stability</h4>
              <p className="text-sm text-gray-600">
                Be part of a growing brand with long-term vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">

          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-3xl font-heading font-bold text-primary">
              Apply Now
            </h2>
            <p className="mt-2 text-gray-600">
              Fill in the form below and we’ll get back to you
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow space-y-6"
            data-aos="fade-up"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border rounded px-4 py-3 w-full"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="border rounded px-4 py-3 w-full"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="border rounded px-4 py-3 w-full"
              />

              <select
                name="position"
                value={form.position}
                onChange={handleChange}
                required
                className="border rounded px-4 py-3 w-full"
              >
                <option value="">Select Position</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="Marketing Executive">Marketing Executive</option>
                <option value="Operations Manager">Operations Manager</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Why should we hire you?"
              value={form.message}
              onChange={handleChange}
              rows="4"
              className="border rounded px-4 py-3 w-full"
            />

            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded font-semibold hover:opacity-90 transition"
            >
              Submit Application
            </button>

          </form>
        </div>
      </section>

    </main>
  );
}
