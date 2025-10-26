// Utility to proxy Unsplash images through our backend
// This helps users in countries where Unsplash is blocked

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Convert an Unsplash image URL to use our backend proxy
 * @param {string} imageUrl - Original image URL
 * @returns {string} - Proxied image URL
 */
export const getProxiedImageUrl = (imageUrl) => {
  if (!imageUrl) return imageUrl;
  
  // Only proxy Unsplash images
  if (imageUrl.startsWith('https://images.unsplash.com')) {
    // Encode the URL to pass as query parameter
    const encodedUrl = encodeURIComponent(imageUrl);
    return `${API_URL}/api/proxy/image?url=${encodedUrl}`;
  }
  
  // Return original URL if not from Unsplash
  return imageUrl;
};
