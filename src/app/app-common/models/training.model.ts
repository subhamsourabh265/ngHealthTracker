export interface Trainings {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: string;
  state?: 'completed' | 'cancelled' | null;
}
