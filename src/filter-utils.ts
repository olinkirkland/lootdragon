import { Item } from './types';

export function getFiltersByKey(
  items: Item[],
  key: keyof Item
): { name: string; count: number }[] {
  const filters: { name: string; count: number }[] = [];
  items.forEach((item) => {
    const filterValue = item[key];
    if (filterValue) {
      const filter = filters.find((f) => filterValue === f.name);
      if (filter) filter.count++;
      else filters.push({ name: filterValue as string, count: 1 });
    }
  });

  return filters;
}

export function getSourcesFilters(
  items: Item[]
): { name: string; count: number }[] {
  const filters: { name: string; count: number }[] = [];

  items.forEach((item) => {
    item.source.forEach((source) => {
      const filter = filters.find((f) => source.text === f.name);
      if (filter) filter.count++;
      else filters.push({ name: source.text, count: 1 });
    });
  });

  return filters.sort((a, b) => {
    // if it contains '#', move it down
    if (a.name.includes('#')) return 1;
    if (b.name.includes('#')) return -1;
    // Sort by count
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    // Sort by name
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

export function getTraitsFilters(
  items: Item[]
): { name: string; count: number }[] {
  const filters: { name: string; count: number }[] = [];

  items.forEach((item) => {
    item.trait.forEach((trait) => {
      const filter = filters.find((f) => trait.text === f.name);
      if (filter) filter.count++;
      else filters.push({ name: trait.text, count: 1 });
    });
  });

  return filters.sort((a, b) => {
    // Sort by count
    if (a.count < b.count) return 1;
    if (a.count > b.count) return -1;
    // Sort by name
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

export function getPriceFilters(
  items: Item[]
): { name: string; html?: string; count: number }[] {
  const filters: {
    name: string;
    html?: string;
    count: number;
  }[] = [
    { name: '0', html: undefined, count: 0 },
    { name: '0.01-0.09', html: undefined, count: 0 },
    { name: '0.1-0.99', html: undefined, count: 0 },
    { name: '1-99', html: undefined, count: 0 },
    { name: '100-499', html: undefined, count: 0 },
    { name: '500-999', html: undefined, count: 0 },
    { name: '1000+', html: undefined, count: 0 }
  ];

  // Count items
  items.forEach((item) => {
    const price = item.price;
    if (!price) filters[0].count++;
    else if (price >= 0.01 && price <= 0.09) filters[1].count++;
    else if (price >= 0.1 && price <= 0.99) filters[2].count++;
    else if (price >= 1 && price <= 99) filters[3].count++;
    else if (price >= 100 && price <= 499) filters[4].count++;
    else if (price >= 500 && price <= 999) filters[5].count++;
    else filters[6].count++;
  });

  // Set html
  const imgPath = 'src/assets/img/';
  filters[0].html = `<span>N/A</span>`;
  filters[1].html = `<span><img class="coin" src="${imgPath}copper.png" />1 - <img class="coin" src="${imgPath}copper.png" />9</span>`;
  filters[2].html = `<span><img class="coin" src="${imgPath}silver.png" />1 - <img class="coin" src="${imgPath}silver.png" />9</span>`;
  filters[3].html = `<span><img class="coin" src="${imgPath}gold.png" />1 - <img class="coin" src="${imgPath}gold.png" />99</span>`;
  filters[4].html = `<span><img class="coin" src="${imgPath}gold.png" />100 - <img class="coin" src="${imgPath}gold.png" />499</span>`;
  filters[5].html = `<span><img class="coin" src="${imgPath}gold.png" />500 - <img class="coin" src="${imgPath}gold.png" />999</span>`;
  filters[6].html = `<span><img class="coin" src="${imgPath}gold.png" />1000+</span>`;

  return filters;
}
