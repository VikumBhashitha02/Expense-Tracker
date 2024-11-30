import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Report from './components/Report';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  // Function to fetch expenses from the API
  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:7000/api/expenses');
      setExpenses(res.data);  // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching expenses:', error);  // Handle errors
    }
  };

  // useEffect hook to run fetchExpenses when the component mounts
  useEffect(() => {
    fetchExpenses();  // Call the fetchExpenses function
  }, []);  // Empty dependency array ensures it runs only once on mount

  // Calculate total income and total expenses
  const calculateTotal = (type) => {
    return expenses
      .filter(expense => expense.type === type)
      .reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const totalIncome = calculateTotal('income'); // Total income
  const totalExpenses = calculateTotal('expense'); // Total expenses
  const netBalance = totalIncome - totalExpenses; // Net balance

  return (
    <Router>
      {/* Navbar for the top navigation */}
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar for navigation */}
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

            {/* Define the routes for navigation */}
            <Routes>
              {/* Route for the Dashboard (default route) */}
              <Route 
                path="/" 
                element={<Dashboard totalIncome={totalIncome} totalExpenses={totalExpenses} netBalance={netBalance} />} 
              />

              {/* Route for the "Add Transaction" page */}
              <Route 
                path="/ExpenseForm" 
                element={<ExpenseForm fetchExpenses={fetchExpenses} />} 
              />
              
              {/* Route for displaying the list of all transactions */}
              <Route 
                path="/all-transactions" 
                element={<ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />} 
              />
              
               {/* Route for displaying the list of all transactions Reports.*/}
              <Route 
                path="/reports" 
                element={<Report totalIncome={totalIncome} totalExpenses={totalExpenses} netBalance={netBalance} />} 
              />              
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
