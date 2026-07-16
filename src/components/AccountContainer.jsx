import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");

    //fetch transactions from db upon mount
    useEffect(() => {
        fetch("http://localhost:6001/transactions")
            .then((r) => r.json())
            .then((data) => setTransactions(data));
    }, []);

    //send new transaction to db and update UI
    function postTransaction(newTransaction) {
        fetch("http://localhost:6001/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })
            .then((r) => r.json())
            .then((data) => {
                // add the new transaction to the existing list
                setTransactions((currentTransactions) => [
                    ...currentTransactions,
                    data,
                ]);
            });
    }

    // sort transactions alphabetically
    function onSort(sortBy) {
        const sortedTransactions = [...transactions].sort((a, b) =>
            a[sortBy].localeCompare(b[sortBy]),
        );

        setTransactions(sortedTransactions);
    }

    // filter transactions based on search text
    const filteredTransactions = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <div>
            <Search setSearch={setSearch} />
            <AddTransactionForm postTransaction={postTransaction} />
            <Sort onSort={onSort} />
            <TransactionsList transactions={filteredTransactions} />
        </div>
    );
}

export default AccountContainer;
