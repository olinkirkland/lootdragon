export type Link = {
  text: string;
  url: string;
};

export type Source = {
  text: string;
  url: string;
  page?: number;
};

export type Item = {
  id: string;
  name: Link;
  slug?: string;
  description?: string;
  links?: Link[];
  source: Source[];
  rarity: string;
  trait: Link[];
  itemCategory: string;
  itemSubcategory: string;
  level: number;
  price: number | null;
  bulk: string;
  usage: string;
  spoilers: string;
};
