import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

describe("Add Transactions", () => {
    // base case
    test("adds a new transaction to the frontend", async () => {
        setFetchResponse([]);

        render(<App />);

        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "Pizza" },
        });

        fireEvent.change(screen.getByPlaceholderText("Category"), {
            target: { value: "Food" },
        });

        fireEvent.change(screen.getByPlaceholderText("Amount"), {
            target: { value: "20" },
        });

        fireEvent.change(screen.getByTestId("date-input"), {
            target: { value: "2025-01-01" },
        });

        global.fetch.mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    id: "13",
                    date: "2025-01-01",
                    description: "Pizza",
                    category: "Food",
                    amount: "20",
                }),
            ok: true,
            status: 201,
        });

        fireEvent.submit(
            screen.getByTestId("add-transaction-button").closest("form"),
        );

        expect(await screen.findByText("Pizza")).toBeInTheDocument();
    });

    // edge case
    test("adds a transaction with a negative amount", async () => {
        setFetchResponse([]);

        render(<App />);

        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "ATM Withdrawal" },
        });

        fireEvent.change(screen.getByPlaceholderText("Category"), {
            target: { value: "Cash" },
        });

        fireEvent.change(screen.getByPlaceholderText("Amount"), {
            target: { value: "-50.25" },
        });

        fireEvent.change(screen.getByTestId("date-input"), {
            target: { value: "2025-01-01" },
        });

        global.fetch.mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    id: "14",
                    date: "2025-01-01",
                    description: "ATM Withdrawal",
                    category: "Cash",
                    amount: "-50.25",
                }),
            ok: true,
            status: 201,
        });

        fireEvent.submit(
            screen.getByTestId("add-transaction-button").closest("form"),
        );

        expect(await screen.findByText("ATM Withdrawal")).toBeInTheDocument();
    });

    // failure case
    test("does not add a transaction when required fields are missing", async () => {
        setFetchResponse([]);

        render(<App />);

        fireEvent.change(screen.getByPlaceholderText("Category"), {
            target: { value: "Food" },
        });

        fireEvent.change(screen.getByPlaceholderText("Amount"), {
            target: { value: "10" },
        });

        fireEvent.change(screen.getByTestId("date-input"), {
            target: { value: "2025-01-01" },
        });

        fireEvent.submit(
            screen.getByTestId("add-transaction-button").closest("form"),
        );

        expect(screen.queryByText("Food")).not.toBeInTheDocument();

        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
