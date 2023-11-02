export type User = {
  id: string;
  username: string;
  password: string;
  favorites: string[]; // The ids of the items the user has bookmarked
  savedSearches: SavedSearch[]; // The saved searches the user has stored
};

export type SavedSearch = {
  id: string;
  name: string;
  icon: string;
  filters: string; // JSON string of the filters
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
  traits: { text: string; url: string; slug: string }[];
  itemCategory: string;
  itemSubcategory: string;
  level: number;
  price: number | null;
  bulk: string;
  usage: string;
  spoilers: string;
};

export type Trait = {
  description: string;
  links: Link[];
};

// export type ItemAndQuantity = {
//   id: string;
//   quantity: number;
// };

// export type Stash = {
//   id: string;
//   type: string;
//   useBulk: boolean;
//   bulkAllowance: number;
//   itemsAndQuantities: ItemAndQuantity[];
//   hidden: boolean;
//   locked: boolean;
// };

export type GameState = {
  gameId: string;
  ownerId: string;
  isPublic: boolean;
  name: string;
  users: { [nickname: string]: string };
};

export type Collection = {
  collectionId: string;
  ownerId: string;
  isPublic: boolean;
  name: string;
  lastUpdated: string;
  itemsAndQuantity: {
    itemId: string;
    quantity: number;
  }[];
};
