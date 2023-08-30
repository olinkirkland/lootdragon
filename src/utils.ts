import { useSettingsStore } from './stores/settingsStore';

export function formatNumber(number: number) {
  return useSettingsStore().largeNumberAbbreviation
    ? abbreviateNumber(number)
    : numberWithCommas(number);
}

export function numberWithCommas(number: number) {
  // 1234567 => 1,234,567
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function abbreviateNumber(number: number) {
  const SCALE_SYMBOL = ['', 'K', 'M', 'B', 'T'];
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;
  const scale = Math.pow(10, tier * 3);
  const scaledNumber = number / scale;

  let formattedNumber = parseFloat(scaledNumber.toFixed(2)).toString();
  const abbreviation = SCALE_SYMBOL[tier];
  return formattedNumber + abbreviation;
}

export function applyTheme(theme: string) {
  document.documentElement.className = `theme-${theme}`;
  console.log('Theme applied:', theme);
}

export function capitalize(str: string | undefined) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
