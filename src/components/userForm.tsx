/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import * as Yup from "yup";
import type { User } from "../types/user";
import { useFormik } from "formik";
import { useEffect } from "react";

interface Prop {
  users: User[];
  onSave: (name: string, email: string, id?: number) => void;
}

export default function UserForm({ users, onSave }: Prop) {
  const navigate = useNavigate()
  const { id } = useParams();
  const finduser = users.find((item) => item.id === Number(id));
  const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
  },

  validationSchema: Yup.object({
    name: Yup.string().trim()
      .required("Name is required"),

    email: Yup.string().trim()
      .email("Invalid email")
      .required("Email is required"),
  }),

  onSubmit: (values) => {
    onSave(values.name,values.email,finduser?.id)
    navigate('/users')
  },
});
  useEffect(() => {
  if (finduser) {
    formik.setValues({
      name: finduser.name,
      email: finduser.email,
    });
  }
}, [finduser?.id]);
  

 return (
    <div className="form-card">

      <h2>{finduser ? "Edit User" : "Add User"}</h2>

      <form onSubmit={formik.handleSubmit}>

        <div className="form-grid">

          <div className="field">
            <label>Name</label>

            <input
              name="name"
              placeholder="e.g. Rahul Bhardwaj"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name &&(
              <p>{formik.errors.name}</p>
            )}
          </div>

          <div className="field"> 
            <label>Email</label>

            <input
              name="email"
              placeholder="e.g. rahul@mail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email &&(
              <p>{formik.errors.email}</p>
            )}
          </div>

        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
          >
            {finduser ? "Update" : "Save"}
          </button>
        </div>

      </form>
    </div>
  );
}