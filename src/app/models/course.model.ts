export interface Course {
  id: number;
  title: string;
  category?: string | null;
  instructor: string;
  duration: string;
  startDate: string;
  fees: number;
  enrolled: boolean;
  rating: number;
  tag?: string | null;
}