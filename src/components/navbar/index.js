import React from "react";

import { logInUser, logoutUser } from "../../store/features/canvas/actions";

const NavBar = ({ dispatch, canvas_group }) => {
  const user = canvas_group[0] && canvas_group[0].user;
  let logInDisplay;

  if (user) {
    logInDisplay = <label>Hello, {user.first_name}</label>;
  } else {
    logInDisplay = (
      <button className="button" onClick={e => dispatch(logInUser())}>
        Login
      </button>
    );
  }

  return (
    <nav
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <h1 className="navbar-item has-text-weight-bold is-size-2 has-text-light">
        Bin Batch
      </h1>
      <div className="navbar-item has-dropdown">
        <a className="navbar-link has-text-light">Docs</a>

        <div className="navbar-dropdown is-boxed">
          <a className="navbar-item">Overview</a>
          <a className="navbar-item">Elements</a>
          <a className="navbar-item">Components</a>
          <hr className="navbar-divider" />
          <div className="navbar-item">Version 0.7.1</div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="field is-grouped">{logInDisplay}</div>
        </div>
        <div className="navbar-item">
          <div className="field is-grouped">
            <button className="button" onClick={e => dispatch(logoutUser())}>
              LogOut
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
