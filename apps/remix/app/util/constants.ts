export const HF_BASE_IMAGE_URL = "https://img.hellofresh.com";
export const HF_AVATAR_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3";
export const HF_ICON_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_32,q_auto,w_32/hellofresh_s3";
export const HF_STEP_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,q_auto,w_500/hellofresh_s3";
export const HF_PLACEHOLDERURL = "https://img.hellofresh.com/w_16,e_vectorize:5/hellofresh_s3";
export const HF_OG_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_700,q_75,w_1200/hellofresh_s3";

export const HF_COVER_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_800,q_auto,w_2400/hellofresh_s3";

export const HF_CARD_IMAGE_URL =
  "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_340,q_auto,w_600/hellofresh_s3";

export const HF_SUGGESTED_RECIPE_URL = `https://www.hellofresh.com/gw/api/recipes/search/suggestions?country=US&locale=en-US&take=5&`;

export const getOgImageUrl = (url: string | undefined | null) => {
  if (typeof url !== "string") {
    return "/logo.jpg";
  }
  return `${HF_OG_IMAGE_URL}${url}`;
};

export const FIVE_MINUTES = 60 * 60 * 5;
