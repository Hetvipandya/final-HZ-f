// import { client } from "../lib/sanity";

// // 🔥 Fetch from Sanity
// export async function getProducts() {
//   const query = `*[_type == "product"]{
//     _id,
//     title,
//     price,
//     description,
//     "image": image.asset->url, 
//     "category": category->title,
//     "categorySlug": category->slug.current,  // ✅ FIX (comma added)
//     _createdAt,
//     rating
//   }`;

//   const data = await client.fetch(query);

//   return data.map((item, index) => ({
//     _id: item._id,
//     id: item._id,
//     name: item.title,
//     price: item.price,
//     originalPrice: item.price + 200,
//     stockQty: 5,
//     rating: item.rating || 0,
//     isBestSeller: false,
//     isSale: false,

//     // ✅ IMPORTANT (use title for filtering)
//     category: item.category || "general",

//     createdAt: item._createdAt,
//     stock: true,
//     sku: `SKU-${index + 1}`,
//     description: item.description,
//     image: item.image || "/placeholder.png",
//     images: item.image ? [item.image] : ["/placeholder.png"],
//   }));
// }

import axios from "axios";
import BASE_URL, { getImageUrl } from "../BASEURL";

const backendUrl = BASE_URL;

// 🔥 Fetch from Backend (MongoDB API)
export async function getProducts() { 
  try {
    const response = await axios.get(`${backendUrl}/api/product/all`);

    const data = response.data?.data || response.data || [];

    return data.map((item, index) => {
      const imageUrls = item.images?.length
        ? item.images.map((img) => getImageUrl(img))
        : item.image
        ? [getImageUrl(item.image)]
        : [];

      return {
        _id: item._id,
        id: item._id,
        name: item.name || item.productName, // backend મુજબ adjust
        price: item.price,
        originalPrice: item.price + 200,
        stockQty: item.stockQty || 5,
        rating: item.rating || 0,
        isBestSeller: item.isBestSeller || false,
        isSale: item.isSale || false,

        // ✅ Category (important for filter)
        category: item.categoryId?.name || item.category || "general",

        createdAt: item.createdAt,
        stock: item.isActive !== false,
        sku: item.sku || `SKU-${index + 1}`,
        description: item.description,

        images: imageUrls,
        image: imageUrls[0] || "https://placehold.co/300x300?text=No+Image",
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
