import { format } from 'date-fns';

export function formatDate(dateString: string) {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy');
}