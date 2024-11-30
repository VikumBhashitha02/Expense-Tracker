import React from 'react';
import { FaHome, FaPlusCircle, FaListAlt, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Import Link for SPA navigation
import '../styles/style.css';  // Importing the CSS file

const Sidebar = () => {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link active d-flex align-items-center">
              <FaHome className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ExpenseForm" className="nav-link d-flex align-items-center">
              <FaPlusCircle className="me-2" /> Add Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/all-transactions" className="nav-link d-flex align-items-center">
              <FaListAlt className="me-2" /> All Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link d-flex align-items-center">
              <FaChartBar className="me-2" /> Reports
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
