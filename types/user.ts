export interface Gender {
  id: number;
  name: string;
}

export interface UserRole {
  id: number;
  name: string;
}

export interface UserFirm {
  id: string;
  name: string;
}

export interface User {
  id: string;
  fullname: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  userName: string;
  birthDate: string;
  gender: Gender;
  role: UserRole;
  firm: UserFirm;
}

export interface UserResponse {
  data: User;
}
