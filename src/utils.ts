
export function formatNumber(number: number) {
  // 1234567 => 1,234,567
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function applyTheme(theme: string) {
  document.documentElement.className = `theme-${theme}`;
  console.log('Theme applied:', theme);
}