import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  coordination:""
 };

const Register = () => {
  const [user, setUser] = useState(initialState);
  const { actions } = useContext(Context);
  const navigate = useNavigate();


  const handleSignup = async () => {
    if (!user.name || !user.email || !user.password ) {
      console.log("Por favor completa todos los campos");
      toast.error("Please fill all fields")
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("lastname", user.lastname);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("coordination", user.password);
      

      const response = await actions.registerUser(formData);

      if (response === 201 || 200) {
        toast.success("Successfully Registered")
        console.log("Registro exitoso")
        //retrasa el cambio a home por 2 segundos
        setTimeout(() => {
          navigate("/newtask")
        }, 2000)

      } else {
        toast.error("Error registering")

        console.log("Error en el registro")
      }
    } catch (error) {
      console.log("Error en la solicitud de registro:", error)
    }
  };

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value });
  };

  return (
    <>
      <ToastContainer theme="dark" position="top-center" pauseOnFocusLoss={false} autoClose={3000} hideProgressBar />
      <div className="container-fluid  w-25 my-4 ">
        <h1>Register</h1>
        <form>
          <div className="form-group  ">
            <label htmlFor="name">Name:</label>
            <input
              className="form-control "
              type="text"
              value={user.name}
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>
          
        <div className="form-group ">
            <label>Email:</label>
            <input
              className="form-control"
              type="email"
              value={user.email}
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group ">
            <label>Password:</label>
            <input
              className="form-control"
              type="password"
              value={user.password}
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group  ">
            <label htmlFor="name">Coordinacion:</label>
            <input
              className="form-control "
              type="text"
              value={user.coordination}
              id="coordination"
              name="coordination"
              onChange={handleChange}
            />
          </div>
        
          <div className="form-group  ">
            <label htmlFor="name">Administrador?:</label>
            <input
              className="form-control "
              type="text"
              value={user.admin}
              id="admin"
              name="admin"
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-secondary mt-3"
            type="button"
            onClick={handleSignup}
          >
            Register
          </button>
        </form>
        {/* <p>
        Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>
      </p> */}
      </div>
    </>
  );
};

export default Register
