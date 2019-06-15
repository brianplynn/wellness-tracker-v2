import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { logOut } from "../functions";
import "./Nav.css";

class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { setSection } = this.props;
    return (
      <Menu
        className={"hamburger-menu"}
        width={"60%"}
        right
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <Link to="/nutrition">
          <span
            className="link dim pointer outline-0 white dib ml1 mb2 mr3"
            title="nutrition"
            onClick={() => {
              setSection("nutrition");
              this.closeMenu();
            }}
          >
            Nutrition
          </span>
        </Link>
        <Link to="/sleep">
          <span
            className="link dim pointer outline-0 white dib ml1 mb2 mr3"
            title="sleep"
            onClick={() => {
              setSection("sleep");
              this.closeMenu();
            }}
          >
            Sleep
          </span>
        </Link>
        <Link to="/exercise">
          <span
            className="link dim pointer outline-0 white dib ml1 mb2 mr3"
            title="exercise"
            onClick={() => {
              setSection("exercise");
              this.closeMenu();
            }}
          >
            Exercise
          </span>
        </Link>
        <span
          className="link dim pointer outline-0 white dib ml1 mb2 mr3"
          title="exercise"
          onClick={() => {
            logOut();
            this.closeMenu();
          }}
        >
          Log Out
        </span>
      </Menu>
    );
  }
}

export default Hamburger;
