// same as JWT payload
interface AuthUser{
    id: number;
    name: string;
    email: string;
    google_id: string;
    image?: string;
}

// overwriting the data types in Express class.
declare namespace Express{

    export interface Request{
        user? : AuthUser;  //(user?) => may be (undefined/null) & its type is AuthUser.
    }

}