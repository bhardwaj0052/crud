import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import { getTaskById } from "../services/TaskService";
import type { Task } from "../types/task";

export default function TaskCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const[task,setTask] = useState<Task | null>(null);
  useEffect(()=>{
    if (!id) return;
    const gettask= async()=>{
      try {
      const response = await getTaskById(id);
      setTask(response);
      } catch (error) {
        console.log(error)
      }
    }
    gettask();
  },[id])
  if (!task) return <div>Task not found</div>;

  return (
   <div className="Task-card">
  <div className="row">
    <div className="initials">{task.id}</div>
    <div>
      <div className="name">{task.title}</div>
      <div className="email">{task.description}</div>
    </div>
  </div>
  <div>
    <span>Priority: {task.priority}</span>
    <span>Status: {task.status}</span>
  </div>
  <button onClick={() => navigate("/task")}>Back</button>
</div>
  );
}

