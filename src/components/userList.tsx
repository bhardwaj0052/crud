import { Link, useNavigate } from "react-router-dom";
import { Paper, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "../types/task";
import { deleteById, getTask } from "../services/TaskService";
import { useEffect, useState } from "react";


export default function TaskList() {
  const navigate = useNavigate();
  const[tasks,setTasks]=useState<Task[] | []>([])
  useEffect(()=>{
    const alltask = async()=>{
      try {
      const response = await getTask();
      setTasks(response)
      } catch (error) {
        console.log(error)
      }
    }
    alltask();
  },[])
  const onDelete = async (id:string) => {
  try {
    await deleteById(id);
    setTasks((prev) => prev.filter((t) => t.id !== id))
  } catch (error) {
    console.error(error);
  }
}

  const columns: GridColDef<Task>[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "userId", headerName: "User ID", width: 80 },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    { field: "description", headerName: "Description", flex: 2, minWidth: 200 },
    { field: "priority", headerName: "Priority", width: 120 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton onClick={() => navigate(`/task/view/${params.row.id}`)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/task/edit/${params.row.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <section>
      <div className="list-header">
        <h2>All Tasks</h2>
        <Link to="/task/add">
          <button>Add Task</button>
        </Link>
        <span className="count-text">{tasks.length} tasks</span>
      </div>

      <Paper sx={{ width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>
    </section>
  );
}