export function formatDateToShortVN(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  return `${day} thg ${month}`;
}
