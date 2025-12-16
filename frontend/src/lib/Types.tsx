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
};
