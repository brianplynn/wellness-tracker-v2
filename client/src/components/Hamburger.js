import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { logOut } from "../functions";
import "./Nav.css";

const Hamburger = ({ setSection }) => {
  return (
    <Menu className={"hamburger-menu"} width={"60%"} disableAutoFocus right>
      <Link to="/nutrition">
        <span
          className="link dim pointer outline-0 white dib ml1 mb2 mr3"
          title="nutrition"
          onClick={setSection}
        >
          Nutrition
        </span>
      </Link>
      <Link to="/sleep">
        <span
          className="link dim pointer outline-0 white dib ml1 mb2 mr3"
          title="sleep"
          onClick={setSection}
        >
          Sleep
        </span>
      </Link>
      <Link to="/exercise">
        <span
          className="link dim pointer outline-0 white dib ml1 mb2 mr3"
          title="exercise"
          onClick={setSection}
        >
          Exercise
        </span>
      </Link>
      <span
        className="link dim pointer outline-0 white dib ml1 mb2 mr3"
        title="exercise"
        onClick={logOut}
      >
        Log Out
      </span>
    </Menu>
  );
};

export default Hamburger;
