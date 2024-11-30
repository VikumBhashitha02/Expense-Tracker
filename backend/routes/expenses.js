const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new expense
router.post('/', async (req, res) => {
    const expense = new Expense({
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type // Include the 'type' field in the request
    });

    try {
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an expense
router.put('/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                description: req.body.description,
                amount: req.body.amount,
                date: req.body.date,
                type: req.body.type // Include the 'type' field in the request
            },
            { new: true } // To return the updated document
        );
        res.json(updatedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        res.json(deletedExpense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
