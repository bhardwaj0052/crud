import { useEffect, useState } from "react";
import { getTask } from "../services/TaskService";
import type { Task } from "../types/task";

export default function Dashboard() {
  const [tasks, setTask] = useState<Task[] | []>([]);
  useEffect(() => {
    const userdata = async () => {
      try {
        const response = await getTask();
        setTask(response);
      } catch (error) {
        console.log(error);
      }
    }
    userdata()
  }, []);
  
  return (
    <div>
      {tasks.length === 0?<h3>Tasks not found</h3> :<h3> {tasks.length}</h3>}
    </div>
  );
}
