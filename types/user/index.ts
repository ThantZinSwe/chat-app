export interface SignUp {
  displayName?: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface UserDetails {
  uid: string;
  displayName: string | undefined;
  email: string | undefined;
}

export interface AuthContextType {
  user: UserDetails | null;
  login: (userData: Login) => Promise<any>;
  signup: (userData: SignUp) => Promise<any>;
  logout: () => Promise<void>;
}
