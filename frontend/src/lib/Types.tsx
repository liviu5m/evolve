export type User = {
  id: number;
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
