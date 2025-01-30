export type User = {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  // DTOs existentes con ajustes
  export type RegisterDTO = {
    email: string;
    password: string;
    name?: string; // Si necesitas nombre agregalo al modelo
  };
  
  export type LoginDTO = {
    email: string;
    password: string;
  };
  
  export type AuthResponse = {
    token: string;
    user: {  // Mejor práctica: enviar objeto user en vez de solo ID
      id: number;
      email: string;
      createdAt: Date;
    };
  };