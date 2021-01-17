// Change date format ie. from 2021-01-01 to Fri Jan 01 2021
export const getDate = (str: string): string => {
  const date = new Date(str);
  return date.toDateString();
};

// Change date range format
export const getDateRange = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return `from ${startDate.toDateString()} to ${endDate.toDateString()}`;
};
