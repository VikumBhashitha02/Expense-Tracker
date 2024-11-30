import React from 'react';
import ExpenseList from '../components/ExpenseList';

const AllTransactions = ({ expenses, fetchExpenses }) => {
  return (
    <div>
      <h2 className="mt-4">All Transactions</h2>
      {/* Display the ExpenseList component */}
      <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
    </div>
  );
};

export default AllTransactions;
