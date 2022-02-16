export class User {
   _id?: number;
   name?: string;
   email: string;
   password: string;
   token?: string;
}


export interface LoginResponse {
   success: boolean;
   token: string;
}

export interface SignupResponse {
   success: boolean;
   message: string;
}
