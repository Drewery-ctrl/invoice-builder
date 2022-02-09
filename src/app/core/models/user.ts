export class User {
   _id: number;
   email: string;
   password: string;
   token?: string;
}


export interface LoginResponse {
   success: boolean;
   token: string;
}
