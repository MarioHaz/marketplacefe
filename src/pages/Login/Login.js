import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PulseLoader from "react-spinners/PulseLoader";
import style from "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const loginInfos = {
  email: "",
  password: "",
};

export default function Login() {
  const [lowercaseEmail, setLowercaseEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("email is required.")
      .email("it must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required."),
  });

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email: lowercaseEmail, password }
      );

      dispatch({ type: "LOGIN", payload: data });

      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setLogin({ ...login, [name]: value });
      setLowercaseEmail(value.toLowerCase());
    } else {
      setLogin({ ...login, [name]: value });
    }
  };

  return (
    <div className="register">
      <div className="register_header">
        <i className="exit_icon" onClick={""}></i>
        <span>Log In</span>
        <span>Enter your e-mail and password</span>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          email,
          password,
        }}
        validationSchema={loginValidation}
        onSubmit={() => loginSubmit()}
      >
        {(formik) => (
          <Form className="register_form">
            <div className="register_line">
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleLoginChange}
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleLoginChange}
              />
            </div>
            <div className="reg_info">
              <Link to="/register" style={{ color: "blue" }}>
                I dont have an account
              </Link>
            </div>

            <div className="reg_btn_wrapper">
              <button
                className="btn-register"
                disabled={loading}
                onClick={() => loginSubmit()}
              >
                {loading ? <PulseLoader color="white" size={5} /> : "Login"}
              </button>
            </div>

            {error && <div className="error_text">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
