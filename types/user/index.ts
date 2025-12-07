export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export type RegisterValidationErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
  submit?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginValidationErrors = {
  email?: string;
  password?: string;
  submit?: string;
};