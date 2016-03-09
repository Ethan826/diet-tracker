export interface ICredentials {
  username: string;
  password: string;
  salt?: string;
  hash?: string;
}
