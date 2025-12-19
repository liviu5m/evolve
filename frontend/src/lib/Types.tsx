export type User = {
  id: number;
  fullName: string;
  email: string;
  birthDate: Date;
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
  birthDate: Date | undefined;
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
}

export type WorkoutLog = {
  id: number;
  workout: Workout;
  exerciseName: string;
  muscleGroup: string;
  sets: string;
  reps: string;
  restTime: string;
  createdAt: string;
}

export type Meal = {
  id: number;
  user: User;
  day: string;
  createdAt: string;
}