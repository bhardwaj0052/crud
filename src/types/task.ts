export interface Task{
  id: string;
  userId:string;
  title: string;
  description: string;
  priority: string;
  status: string;
}

export type TaskInput = Omit<Task, "id" | "userId">;