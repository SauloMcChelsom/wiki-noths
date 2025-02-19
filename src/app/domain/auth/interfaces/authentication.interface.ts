import { eUserGenre } from "../enums/user-genre.enum";

export interface iAuthentication {
    name?: string;
    email: string;
    phone?: string;
    age?: string;
    genre?: eUserGenre;
    password: string;
}