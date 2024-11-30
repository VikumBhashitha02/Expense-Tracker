import React from 'react';
import { FaSignOutAlt, FaSearch } from 'react-icons/fa';
import '../styles/style.css';  // Importing the CSS file

const Navbar = () => {
  return (
    <header className="navbar navbar-dark sticky-top bg-dark shadow-sm p-2">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-4 text-white" href="#">
        <strong>Expense Tracker</strong>
      </a>
      <button
        className="navbar-toggler d-md-none me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
     {/* <form className="d-none d-md-flex w-100 mx-3" role="search">
      <input
        className="form-control form-control-dark bg-light text-dark border-0"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-light" type="submit">
        <FaSearch />
      </button>
    </form> */}

      <div className="navbar-nav ms-auto">
        <div className="nav-item text-nowrap">
          <a className="nav-link text-white px-3 d-flex align-items-center" href="#">
            <FaSignOutAlt className="me-2" /> Sign out
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
