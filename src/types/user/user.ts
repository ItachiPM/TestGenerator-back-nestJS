export interface UserInterface {
  id?: string;
  login: string;
  pwdHash: string;
  currentTokenId: string | null
}

export interface RegisterUser {
  login: string;
  password: string;
}

export type UserResponseForAdmin = {
  id: string;
  login: string;
}
