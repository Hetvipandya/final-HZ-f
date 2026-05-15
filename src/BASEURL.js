// ================= BASE URL =================
const BASE_URL = "https://final-hz-b.onrender.com";

// ================= IMAGE URL HELPER =================
export const getImageUrl = (
  src,
  fallback = "https://via.placeholder.com/300?text=No+Image"
) => {
  // No image
  if (!src) return fallback;

  // ARRAY HANDLE
  if (Array.isArray(src)) {
    if (src.length === 0) return fallback;
    src = src[0];
  }

  // OBJECT HANDLE
  if (typeof src === "object") {
    src =
      src.url ||
      src.secure_url ||
      src.path ||
      src.image ||
      "";
  }

  // STRING CHECK
  if (typeof src !== "string") return fallback;

  const imagePath = src.trim().replace(/\\/g, "/");

  // ================= CLOUDINARY / FULL URL =================
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("blob:")
  ) {
    return imagePath;
  }

  // ================= LOCAL IMAGE SUPPORT =================
  if (imagePath.startsWith("/")) {
    return `${BASE_URL}${imagePath}`;
  }

  if (imagePath.startsWith("uploads/")) {
    return `${BASE_URL}/${imagePath}`;
  }

  return `${BASE_URL}/uploads/${imagePath}`;
};

export default BASE_URL;