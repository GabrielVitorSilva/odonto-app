export const colors = {
  blue: '#38ABE2',
  red: '#E15050',
  green: '#5DB075',
  yellow: '#C3C028',
} as const;

export type ColorKeys = keyof typeof colors; 