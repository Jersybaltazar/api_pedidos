export type RegisterDTO = {
    email: string;
    password: string;
  };
  
  export type LoginDTO = {
    email: string;
    password: string;
  };
  
  export type AuthResponse = {
    token: string;
    userId: number;
  };