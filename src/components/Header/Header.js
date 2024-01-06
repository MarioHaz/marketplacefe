import React from "react";
import style from "./style.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

export default function Header(props) {
  const { profile, setVisible } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return (
    <header>
      <div className="header_rigth">MarketPlace</div>
      <div className="header_center">
        <Input setVisible={setVisible} />
      </div>
      <div className="header_left">
        {profile ? (
          <Link to="/">
            <button className="logoutbutton">Home</button>
          </Link>
        ) : (
          <Link to="/profile">
            <button className="logoutbutton">Profile</button>
          </Link>
        )}

        <button className="logoutbutton" onClick={() => logout()}>
          Log-out
        </button>
      </div>
    </header>
  );
}
