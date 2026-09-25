export interface Workout {
  id: number;
  name: string;
  description: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  instructions: string[];
}