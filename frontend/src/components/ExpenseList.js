import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMoneyBillWave, FaMoneyCheckAlt, FaWallet, FaEdit, FaTrashAlt, FaFilePdf, FaFileExcel } from 'react-icons/fa'; // Import icons
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Required for table formatting in PDFs
import * as XLSX from 'xlsx';

const ExpenseList = ({ expenses, fetchExpenses }) => {
    const [editingId, setEditingId] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedAmount, setUpdatedAmount] = useState('');
    const [updatedType, setUpdatedType] = useState('expense'); // Track the updated type

    // State for validation errors
    const [descriptionError, setDescriptionError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [typeError, setTypeError] = useState('');

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Validate description, amount, and type
    const validateForm = () => {
        let valid = true;

        // Validate description
        if (!updatedDescription.trim()) {
            setDescriptionError('Description is required.');
            valid = false;
        } else if (updatedDescription.length > 50) {
            setDescriptionError('Description cannot exceed 50 characters.');
            valid = false;
        } else {
            setDescriptionError(''); // Clear error if valid
        }

        // Validate amount
        if (!updatedAmount || isNaN(updatedAmount) || updatedAmount <= 0) {
            setAmountError('Amount must be a valid number greater than 0.');
            valid = false;
        } else {
            setAmountError(''); // Clear error if valid
        }

        // Validate type
        if (!['income', 'expense'].includes(updatedType)) {
            setTypeError('Invalid type. It must be either income or expense.');
            valid = false;
        } else {
            setTypeError(''); // Clear error if valid
        }

        return valid;
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:7000/api/expenses/${id}`);
        fetchExpenses();
    };

    const handleUpdate = async (id) => {
        if (!validateForm()) {
            return; // Stop form submission if validation fails
        }

        await axios.put(`http://localhost:7000/api/expenses/${id}`, {
            description: updatedDescription,
            amount: updatedAmount,
            type: updatedType, // Include the updated type in the PUT request
        });
        setEditingId(null); // Exit edit mode after update
        fetchExpenses();
    };

    const startEditing = (expense) => {
        setEditingId(expense._id);
        setUpdatedDescription(expense.description);
        setUpdatedAmount(expense.amount);
        setUpdatedType(expense.type); // Set the current type when editing starts
    };

    // Calculate totals for income, expenses, and net balance
    const calculateTotal = (type) => {
        return expenses
            .filter((expense) => expense.type === type)
            .reduce((total, expense) => total + parseFloat(expense.amount), 0);
    };

    const totalIncome = calculateTotal('income');
    const totalExpenses = calculateTotal('expense');
    const netBalance = totalIncome - totalExpenses;

    // Filter expenses based on the search query
    const filteredExpenses = expenses.filter((expense) => {
        const formattedDate = new Date(expense.date).toLocaleDateString();
        return (
            expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expense.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            formattedDate.includes(searchQuery)
        );
    });

    // Download PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Expense Report', 20, 10);
        doc.autoTable({
            head: [['Description', 'Amount', 'Type', 'Date']],
            body: filteredExpenses.map((expense) => [
                expense.description,
                `$${expense.amount}`,
                expense.type === 'income' ? 'Income' : 'Expense',
                new Date(expense.date).toLocaleDateString(),
            ]),
        });
        doc.save('expense_report.pdf');
    };

    // Download Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredExpenses.map((expense) => ({
                Description: expense.description,
                Amount: `$${expense.amount}`,
                Type: expense.type === 'income' ? 'Income' : 'Expense',
                Date: new Date(expense.date).toLocaleDateString(),
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
        XLSX.writeFile(workbook, 'expense_report.xlsx');
    };

    return (
        <div className="container mt-5">
            {/* Search Bar */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by description, type, or date"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Buttons for downloading PDF and Excel */}
            <div className="mb-3">
                <button className="btn btn-danger mr-2" onClick={downloadPDF}>
                    <FaFilePdf /> Download PDF
                </button>
                <button className="btn btn-success" onClick={downloadExcel}>
                    <FaFileExcel /> Download Excel
                </button>
            </div>

            <table className="table table-hover table-bordered table-striped shadow-sm">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense) => (
                        <tr key={expense._id}>
                            {editingId === expense._id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updatedDescription}
                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                            placeholder="Update description"
                                        />
                                        {/* Display description error */}
                                        {descriptionError && <small className="text-danger">{descriptionError}</small>}
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={updatedAmount}
                                            onChange={(e) => setUpdatedAmount(e.target.value)}
                                            placeholder="Update amount"
                                        />
                                        {/* Display amount error */}
                                        {amountError && <small className="text-danger">{amountError}</small>}
                                    </td>
                                    <td>
                                        <select
                                            className="form-control"
                                            value={updatedType}
                                            onChange={(e) => setUpdatedType(e.target.value)}
                                        >
                                            <option value="income">Income</option>
                                            <option value="expense">Expense</option>
                                        </select>
                                        {/* Display type error */}
                                        {typeError && <small className="text-danger">{typeError}</small>}
                                    </td>
                                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-success btn-sm mr-2"
                                            onClick={() => handleUpdate(expense._id)}
                                        >
                                            <FaEdit /> Save
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setEditingId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{expense.description}</td>
                                    <td>${expense.amount}</td>
                                    <td>{expense.type === 'income' ? 'Income' : 'Expense'}</td>
                                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mr-2"
                                            onClick={() => startEditing(expense)}
                                        >
                                            <FaEdit /> Update
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                if (window.confirm(`Are you sure you want to delete this expense: "${expense.description}"?`)) {
                                                    handleDelete(expense._id);
                                                }
                                            }}
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Dashboard cards for Total Income, Total Expenses, and Net Balance */}
            <div className="row mt-5 mb-4">
                {/* Total Income Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Total Income</h5>
                                    <p className="card-text">${totalIncome.toFixed(2)}</p>
                                </div>
                                <FaMoneyBillWave className="icon-lg" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Total Expenses Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-white bg-danger">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Total Expenses</h5>
                                    <p className="card-text">${totalExpenses.toFixed(2)}</p>
                                </div>
                                <FaMoneyCheckAlt className="icon-lg" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Net Balance Card */}
                <div className="col-md-4 mb-4">
                    <div className={`card text-white ${netBalance >= 0 ? 'bg-success' : 'bg-dark'}`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Net Balance</h5>
                                    <p className="card-text">${netBalance.toFixed(2)}</p>
                                </div>
                                <FaWallet className="icon-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseList;
