export type User = {
  id: number;
  fullName: string;
  email: string;
  birthDate: string;
  goal: string;
  height: number;
  weight: number;
  activityLevel: string;
  dailyRestrictions: string;
  gym: boolean;
  calisthenics: boolean;
};

export type SignupData = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type UserUpdateData = {
  fullName: string;
  birthDate: string;
  goal: string;
  height: undefined | string;
  weight: undefined | string;
  activityLevel: string;
  dailyRestrictions: string;
  calisthenics: boolean;
  gym: boolean;
};

export type Workout = {
  id: number;
  user: User;
  sessionLabel: string;
  totalTime: number;
  day: string;
  createdAt: string;
  logs: WorkoutLog[];
};

export type WorkoutLog = {
  id: number;
  workout: Workout;
  exerciseName: string;
  muscleGroup: string;
  sets: string;
  reps: string;
  restTime: string;
  createdAt: string;
};

export type Meal = {
  id: number;
  user: User;
  day: string;
  meals: MealLog[];
  createdAt: string;
};

export type MealLog = {
  id: number;
  mealTime: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  mealType: string;
  imageUrl: string;
  createdAt: string;
};

export type ProgressData = {
  workout?: boolean;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  snack?: boolean;
  weight?: number;
};

export type WeightResponse = {
  weight: number;
  day: string;
};

export type ShoppingItem = {
  id: number;
  name: string;
  quantity: string;
  category: string;
  purchased: boolean;
}