import axios from "axios";
import type { User } from "../types/user";

export async function getUser():Promise<User[]> {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    if(!response){
        return [];
    }
    return response.data;
}