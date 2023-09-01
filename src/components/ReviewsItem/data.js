export default function formatDateTime(data) {
  const originalDate = new Date(data);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');

  const hours = originalDate.getHours().toString().padStart(2, '0');
  const minutes = originalDate.getMinutes().toString().padStart(2, '0');

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
}
