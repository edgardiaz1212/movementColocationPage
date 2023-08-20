import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const handleLogin = async () => {
    
    
    const response = await actions.login(user);
    if (response == 200) {
      toast.success("Successfully Registered");
      setTimeout(() => {
        navigate("/")
      }, 2000)

      await actions.getUserData;
      
    }
    if (response == 400) {
      toast.error("Please fill all fields")
    }
  };
 
  return (
    <>
    caracas
    <div className="mb-3" >
                      <label
                        htmlFor="exampleDropdownFormEmail2"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        className="form-control"
                        id="exampleDropdownFormEmail2"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleDropdownFormPassword2"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        className="form-control"
                        id="exampleDropdownFormPassword2"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="dropdownCheck2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="dropdownCheck2"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="loginButton btn btn-secondary w-100 mt-3"
                      onClick={() => handleLogin()}
                    >
                      Sign in
                    </button>
    </>

  )
}

export default Login