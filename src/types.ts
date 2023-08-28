export type User = {
  id: string;
  username: string;
  password: string;
  favorites: string[]; // The ids of the items the user has bookmarked
  collections: string[]; // The ids of the collections the user owns
  games: string[]; // The ids of the games the user owns
};

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

export type Game = {
  id: string;
  owner: string;
  name: string;
};
