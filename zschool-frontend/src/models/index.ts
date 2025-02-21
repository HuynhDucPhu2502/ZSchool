export type Contact = {
  name: string;
  mobileNumber: string;
  email: string;
  message: string;
  subject: string;
};

export type UserRegistrationRequest = {
  name: string;
  password: string;
  username: string;
};

export type UserLoginRequest = {
  username: string;
  password: string;
};
