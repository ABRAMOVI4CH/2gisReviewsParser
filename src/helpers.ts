export const formDate = (dateString: string): number => {
  const ms = Date.parse(dateString);
  if (Number.isNaN(ms)) {
    return 0;
  }
  return ms / 1000;
};

export const pickFirstNonEmpty = (...values: Array<string | null | undefined>): string | null => {
  for (const value of values) {
    if (value && value.trim().length > 0) {
      return value;
    }
  }
  return null;
};
