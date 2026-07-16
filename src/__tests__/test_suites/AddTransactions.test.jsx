import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

describe("Add Transactions", () => {
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

        // mock POST response
        global.fetch.mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    id: "13",
                    date: "2025-01-01",
                    description: "Pizza",
                    category: "Food",
                    amount: "20",
                }),
        });

        // submit the form instead of clicking the button
        fireEvent.submit(
            screen.getByTestId("add-transaction-button").closest("form"),
        );

        expect(await screen.findByText("Pizza")).toBeInTheDocument();
    });

    test("calls POST when submitting a transaction", async () => {
        setFetchResponse([]);

        render(<App />);

        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "Coffee" },
        });

        fireEvent.change(screen.getByPlaceholderText("Category"), {
            target: { value: "Food" },
        });

        fireEvent.change(screen.getByPlaceholderText("Amount"), {
            target: { value: "5" },
        });

        fireEvent.change(screen.getByTestId("date-input"), {
            target: { value: "2025-01-01" },
        });

        global.fetch.mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    id: "14",
                    date: "2025-01-01",
                    description: "Coffee",
                    category: "Food",
                    amount: "5",
                }),
        });

        fireEvent.submit(
            screen.getByTestId("add-transaction-button").closest("form"),
        );

        expect(global.fetch).toHaveBeenCalled();

        // First fetch is GET, second fetch is POST
        expect(global.fetch).toHaveBeenNthCalledWith(
            2,
            "http://localhost:6001/transactions",
            expect.objectContaining({
                method: "POST",
            }),
        );
    });
});
