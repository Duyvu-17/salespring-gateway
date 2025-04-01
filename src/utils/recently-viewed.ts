
import { Product } from '@/data/products';

const RECENTLY_VIEWED_KEY = 'recentlyViewedProducts';
const MAX_RECENT_PRODUCTS = 8;

/**
 * Get recently viewed products from local storage
 */
export const getRecentlyViewed = (): Product[] => {
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error getting recently viewed products:', error);
    return [];
  }
};

/**
 * Add product to recently viewed products
 * @param product The product to add to recently viewed
 */
export const addToRecentlyViewed = (product: Product): void => {
  try {
    const recentProducts = getRecentlyViewed();
    
    // Remove the product if it already exists to avoid duplicates
    const filteredProducts = recentProducts.filter(p => p.id !== product.id);
    
    // Add product to the beginning of the array
    const updatedProducts = [product, ...filteredProducts].slice(0, MAX_RECENT_PRODUCTS);
    
    // Save to localStorage
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.error('Error adding to recently viewed products:', error);
  }
};

/**
 * Clear all recently viewed products
 */
export const clearRecentlyViewed = (): void => {
  localStorage.removeItem(RECENTLY_VIEWED_KEY);
};
