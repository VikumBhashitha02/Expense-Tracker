import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMoneyBillWave, FaMoneyCheckAlt, FaWallet } from 'react-icons/fa';

const ExpenseForm = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netBalance, setNetBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch expenses on component mount
        fetchExpenses();
    }, []);

    // Fetch all transactions and calculate totals
    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/expenses');
            const data = response.data;

            setTransactions(data);

            // Calculate total income, expenses, and balance
            let income = 0;
            let expenses = 0;

            data.forEach(transaction => {
                if (transaction.type === 'income') {
                    income += transaction.amount;
                } else if (transaction.type === 'expense') {
                    expenses += transaction.amount;
                }
            });

            setTotalIncome(income);
            setTotalExpenses(expenses);
            setNetBalance(income - expenses);

        } catch (error) {
            console.error("There was an error fetching expenses!", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'description') {
            setDescription(value);
        } else if (name === 'amount') {
            setAmount(value);
        } else if (name === 'type') {
            setType(value);
        }

        // Clear specific field errors on input change
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    // Validation function
    const validateForm = () => {
        let tempErrors = {};
        let formIsValid = true;

        // Validate description
        if (!description) {
            formIsValid = false;
            tempErrors["description"] = "Description cannot be empty";
        } else if (description.length < 3) {
            formIsValid = false;
            tempErrors["description"] = "Description must be at least 3 characters long";
        } else if (description.length > 50) {
            formIsValid = false;
            tempErrors["description"] = "Description cannot exceed 50 characters";
        }

        // Validate amount
        if (!amount) {
            formIsValid = false;
            tempErrors["amount"] = "Amount cannot be empty";
        } else if (isNaN(amount)) {
            formIsValid = false;
            tempErrors["amount"] = "Amount must be a valid number";
        } else if (parseFloat(amount) <= 0) {
            formIsValid = false;
            tempErrors["amount"] = "Amount must be greater than zero";
        }

        // Validate type
        if (!type || (type !== 'income' && type !== 'expense')) {
            formIsValid = false;
            tempErrors["type"] = "Please select a valid transaction type";
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        // Submit form to the backend
        await axios.post('http://localhost:7000/api/expenses', {
            description,
            amount: parseFloat(amount),
            type
        })
        .then(() => {
            setShowPopup(true);
            // Reset form and hide success popup after 2 seconds
            setTimeout(() => {
                setShowPopup(false);
                setDescription('');
                setAmount('');
                setType('expense');
                fetchExpenses(); // Refresh expense list and totals
            }, 1000);
        })
        .catch(error => {
            console.error("There was an error!", error);
            alert('Failed to add the transaction!');
        });
    };

    return (
        <div className="col-md-8 mt-4 mx-auto" id="add-transaction">
            <h3 className="text-center mb-3">Add New Transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        name="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleInputChange}
                    />
                    {errors.amount && <div className="text-danger">{errors.amount}</div>}
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Type</label>
                    <select
                        className="form-control"
                        name="type"
                        value={type}
                        onChange={handleInputChange}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    {errors.type && <div className="text-danger">{errors.type}</div>}
                </div>

                <button className="btn btn-primary btn-block" type="submit">
                    Add Transaction
                </button>
            </form>

            {showPopup && (
                <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    Transaction added successfully!
                    <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                </div>
            )}

            {/* Dashboard cards for Total Income, Total Expenses, and Net Balance */}
            <div className="row mt-5 mb-4">
                {/* Total Income Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <FaMoneyBillWave size={20} className="text-success mb-2" />
                            <h5 className="card-title">Total Income</h5>
                            <h3 className="card-text">${totalIncome.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                {/* Total Expenses Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <FaMoneyCheckAlt size={20} className="text-danger mb-2" />
                            <h5 className="card-title">Total Expenses</h5>
                            <h3 className="card-text">${totalExpenses.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                {/* Net Balance Card */}
                <div className="col-md-4 mb-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <FaWallet size={20} className="text-info mb-2" />
                            <h5 className="card-title">Net Balance</h5>
                            <h3 className="card-text">${netBalance.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            </div>    
        </div>        
    );
};

export default ExpenseForm;
