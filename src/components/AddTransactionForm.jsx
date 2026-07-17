import React from "react";

function AddTransactionForm({ postTransaction }) {
    function submitForm(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const newTransaction = {
            date: formData.get("date"),
            description: formData.get("description"),
            category: formData.get("category"),
            amount: Number(formData.get("amount")),
        };

        // prevent submitting incomplete transactions
        if (
            !newTransaction.date ||
            !newTransaction.description ||
            !newTransaction.category ||
            !newTransaction.amount
        ) {
            return;
        }

        postTransaction(newTransaction);

        // clear the form after successful submission
        e.target.reset();
    }

    return (
        <div className="ui segment">
            <form className="ui form" onSubmit={submitForm}>
                <div className="inline fields">
                    <input type="date" name="date" data-testid="date-input" />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                    />

                    <input type="text" name="category" placeholder="Category" />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        step="0.01"
                    />
                </div>

                <button
                    data-testid="add-transaction-button"
                    className="ui button"
                    type="submit"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}

export default AddTransactionForm;
