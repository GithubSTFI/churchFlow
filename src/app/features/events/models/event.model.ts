export interface Event {
  id: number;
  title: string;
  type: 'Administratives' | 'Culturels' | 'Communautaires' | 'Liturgiques';
  date: string;
  time: string;
  visibility: string;
  recurrence?: string;
} 