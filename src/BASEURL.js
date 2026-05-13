// const BASE_URL = "http://localhost:5001";
const BASE_URL = "https://final-hz-b.onrender.com";

export const getImageUrl = (src, fallback = "https://via.placeholder.com/300?text=No+Image") => {
  if (!src || typeof src !== "string") return fallback;

  const imagePath = src.trim().replace(/\\/g, "/");

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("blob:")
  ) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${BASE_URL}${imagePath}`;
  }

  if (imagePath.startsWith("uploads/")) {
    return `${BASE_URL}/${imagePath}`;
  }

  return `${BASE_URL}/uploads/${imagePath}`;
};

export default BASE_URL;
