import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { createTask, getTaskById, updatetask } from "../services/TaskService";

export default function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "",
      status: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().min(4).required("Title is required"),
      description: Yup.string()
        .trim()
        .min(6)
        .required("Description is required"),
      priority: Yup.string().trim().required("Priority is required"),
      status: Yup.string().trim().required("Status is required"),
    }),

    onSubmit: async (values) => {
      if(!id){
      try {
        await createTask(values);
        navigate("/task");
      } catch (error) {
        console.error(error);
      }
    }else{
      try {
        await updatetask(id,values);
        navigate("/task");
      } catch (error) {
        console.error(error);
      }
    }}
  });

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id);
        formik.setValues({
          title: response.title,
          description: response.description,
          priority: response.priority,
          status: response.status,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="form-card">
      <h2>{id ? "Edit Task" : "Add Task"}</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label>Title</label>
            <input
              name="title"
              placeholder="e.g. title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p>{formik.errors.title}</p>
            )}
          </div>

          <div className="field">
            <label>Description</label>
            <input
              name="description"
              placeholder="e.g. Users can't log in with Google"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <p>{formik.errors.description}</p>
            )}
          </div>

          <div className="field">
            <label>Priority</label>
            <select
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formik.touched.priority && formik.errors.priority && (
              <p>{formik.errors.priority}</p>
            )}
          </div>

          <div className="field">
            <label>Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p>{formik.errors.status}</p>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
