export type AkisRecipesByCategory = {
  data: Datum[];
  links: Links;
  meta: Meta;
};

export type Datum = {
  id: number;
  user_id: number;
  recipe_category_id: number;
  slug: string;
  published: number;
  title: string;
  description: string;
  time: number;
  shares: string;
  difficulty: string;
  video_url: null | string;
  fb_video: null | string;
  average_score: number | null;
  assets: Asset[];
  vertical_asset_url: string;
  sponsor_logo: null;
  category: Category;
  created_at: Date;
  updated_at: Date;
};

export type Asset = {
  url: string;
};

export type Category = {
  id: number;
  old_id: null;
  slug: string;
  is_video_category: number;
  is_main_category: number;
  is_hidden: number;
  lft: number;
  rgt: number;
  parent_id: number;
  depth: number;
  created_at: Date;
  updated_at: Date;
};

export type Links = {
  first: string;
  last: string;
  prev: null;
  next: string;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};
