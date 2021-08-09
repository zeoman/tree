export interface IUser {
  login: string;
  password: string;
  male?: 'male' | 'female';
  dateOfBirth?: string;
  email?: string;
}
