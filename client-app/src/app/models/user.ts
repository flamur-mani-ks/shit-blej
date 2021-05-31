export interface IUser {
  username: string;
  displayName: string;
  token: string;
  image?: string;
  phoneNumber?: string;
  city?: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
}