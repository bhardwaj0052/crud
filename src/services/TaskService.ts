import type { Task, TaskInput } from "../types/task";
import api from "./axios";

export async function getTask(): Promise<Task[]> {
    const response = await api.get(`/tasks`);
    return response.data;
}
export async function createTask(task:TaskInput):Promise<string> {
    const response = await api.post(`/tasks`,task)
    return response.data
}
export async function getTaskById( id : string):Promise<Task> {
    const response = await api.get(`/tasks/${id}`)
    return response.data;
}
export async function deleteById(id:string):Promise<string> {
    const response = await api.delete(`/tasks/${id}`)
    return response.data;
}
export async function updatetask(id:string,task:TaskInput) {
    const response = await api.patch(`/tasks/${id}`,task)
    return response.data;
}
