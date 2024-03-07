export interface CurrentUserInterface {
  id: string;
  email: string;
  password: string | undefined;
  avatar: string;
  displayName: string;
  token: string;
}
