import { useState } from "react";

export default function SizeGuideModal({ isOpen, onClose }) {
  const [tab, setTab] = useState("shirts");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-primary">
            {tab === "shirts"
              ? "Shirts Measurement Chart"
              : "Sweatshirt Measurement Chart"}
          </h2>
          <button onClick={onClose}>
            ❌
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-6 px-6 pt-4 border-b text-sm font-semibold">
          <button
            onClick={() => setTab("shirts")}
            className={`pb-2 ${
              tab === "shirts"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
          >
            Shirts
          </button>
          <button
            onClick={() => setTab("sweatshirts")}
            className={`pb-2 ${
              tab === "sweatshirts"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
          >
            Sweatshirts
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-6 space-y-8">
          {/* TITLE */}
          <div className="text-center bg-gray-50 p-4 rounded">
            <h3 className="font-bold text-blue-700">
              {tab === "shirts"
                ? "SPREAD COLLAR SLIM FIT SHIRTS"
                : "COMFORT FIT SWEATSHIRTS"}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Measure a similar garment that fits you well and compare it with the
              chart below for the best fit.
            </p>
          </div>

          {/* CM TABLE */}
          <MeasurementTable
            title="Measurements in Centimeters"
            data={tab === "shirts" ? shirtCM : sweatshirtCM}
          />

          {/* INCH TABLE */}
          <MeasurementTable
            title="Measurements in Inches"
            data={tab === "shirts" ? shirtIN : sweatshirtIN}
          />

          {/* DISCLAIMER */}
          <div className="bg-yellow-50 border border-yellow-200 text-xs p-3 rounded text-center text-gray-600">
            **Disclaimer:** All measurements are garment measurements and may vary
            slightly (±1 cm). Always check the specific fit type mentioned above.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- TABLE COMPONENT ---------------- */

function MeasurementTable({ title, data }) {
  return (
    <div>
      <h4 className="font-semibold mb-2 text-primary">{title}</h4>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-primary/10">
            <tr>
              <th className="px-3 py-2 text-left">Measure</th>
              {data.sizes.map((s) => (
                <th key={s} className="px-3 py-2">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.label} className="border-t">
                <td className="px-3 py-2 text-left font-medium">
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td key={i} className="px-3 py-2">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- DATA ---------------- */

const shirtCM = {
  sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  rows: [
    { label: "Chest", values: [100, 105, 110, 116, 123, 138] },
    { label: "Across Shoulder", values: [40, 42, 44, 46, 48, 53] },
    { label: "Front Length (Nap)", values: [72, 74, 75, 76, 79, 81] },
    { label: "Sleeve Length", values: [62, 63, 64, 65, 66, 67] },
  ],
};

const shirtIN = {
  sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  rows: [
    { label: "Chest", values: [39.5, 41.5, 43.5, 45.5, 48.5, 51.5] },
    { label: "Across Shoulder", values: [15.75, 16.5, 17.25, 18, 19, 20] },
    { label: "Front Length (Nap)", values: [28.5, 29, 29.5, 30, 31, 32] },
    { label: "Sleeve Length", values: [24.5, 25, 25.5, 26, 26.5, 27] },
  ],
};

const sweatshirtCM = {
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  rows: [
    { label: "Chest", values: [102, 107, 112, 117, 122, 127, 132] },
    { label: "Across Shoulder", values: [47, 49, 51, 53, 55, 58, 60] },
    { label: "Front Length", values: [69, 70, 71, 72, 74, 75, 76] },
  ],
};

const sweatshirtIN = {
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  rows: [
    { label: "Chest", values: [40, 42, 44, 46, 48, 50, 52] },
    { label: "Across Shoulder", values: [18.5, 19.25, 20, 20.75, 21.75, 22.75, 23.75] },
    { label: "Front Length", values: [27, 27.5, 28, 28.5, 29, 29.5, 30] },
  ],
};
