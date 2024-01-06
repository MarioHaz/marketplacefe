import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const userInfos = {
  email: "",
  password: "",
};

export default function Register() {
  const [selectError, setSelectError] = useState("");
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userInfos);
  const { company_Name, email, password, phone_number, Economic_Sector } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerValidation = Yup.object({
    email: Yup.string()
      .required("Email id required")
      .email("Add a valid email address")
      .matches(
        /^[^@\s]+@[^@\s]+$/,
        "invalid format, correct format: ejemplo@dominio.com"
      ),

    password: Yup.string()
      .required("Create a password")
      .min(6, "La contraseña debe tener al minimo 6 caracteres")
      .max(20, "La contraseña debe tener maximo 20 caracteres"),
  });

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        { email, password }
      );

      setError("");
      setSucces(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSucces("");
      setError(error.response.data.message);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="register">
      <div className="register_header">
        <i className="exit_icon" onClick={""}></i>
        <span>Register</span>
        <span>fast and easy</span>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          company_Name,
          email,
          password,
          phone_number,
          Economic_Sector,
        }}
        validationSchema={registerValidation}
        onSubmit={(user) => {
          let option = user.Economic_Sector;

          let notOption = "";
          let noOption = "Select an option";

          if (option === notOption) {
            setSelectError("Please select an option");
          } else if (option === noOption) {
            setSelectError("Please select an option");
          } else {
            setSelectError("");
            registerSubmit();
          }
        }}
      >
        {(formik) => (
          <Form className="register_form">
            <div className="register_line">
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleRegisterChange}
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleRegisterChange}
              />
            </div>
            <div className="reg_info">
              <Link to="/login" style={{ color: "blue" }}>
                I have an account
              </Link>
            </div>

            <div className="reg_btn_wrapper">
              <button className="btn-register" disabled={loading}>
                {loading ? <PulseLoader color="white" size={5} /> : "Register"}
              </button>
            </div>
            {succes && <div className="succes_text">{succes}</div>}
            {error && <div className="error_text">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
