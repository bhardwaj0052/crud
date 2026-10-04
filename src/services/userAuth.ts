import type { Login } from "../types/login";
import type { Signup } from "../types/signup";
import type { User } from "../types/user";
import api from "./axios";

export async function signup(signup:Signup):Promise<User>{
    const response = await api.post('/users',signup)
    return response.data;
}
export async function loginuser(login:Login){
    const response = await api.post('/auth/login',login)
    localStorage.setItem("access_token",response.data.access_token)
    return response.data;
}