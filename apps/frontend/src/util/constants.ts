export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
export const HELLOFRESH_SEARCH_URL = `${API_URL}/hellofresh`;
export const HF_AVATAR_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3";
export const HF_ICON_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_32,q_auto,w_32/hellofresh_s3";
export const HF_STEP_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,q_auto,w_500/hellofresh_s3";
export const HF_PLACEHOLDERURL = "https://img.hellofresh.com/w_16,e_vectorize:5/hellofresh_s3";
export const HF_OG_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_630,q_auto,w_1200/hellofresh_s3";

export const HF_IMPORTED_RECIPE_URL = `${API_URL}/scrape`;
export const HF_SUGGESTED_RECIPE_URL = `https://www.hellofresh.com/gw/api/recipes/search/suggestions?country=US&locale=en-US&take=5&`;
