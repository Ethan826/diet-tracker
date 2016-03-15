export interface ICredentials {
  username: string;
  password: string;
  salt?: string;
  hash?: string;
}

export interface IJWT {
  iss: string;
  iat: number;
  aud: string;
  exp: number;
  userId: number;
  username: string;
}
