const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Restrict the type to either 'income' or 'expense'
        required: true,
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);




