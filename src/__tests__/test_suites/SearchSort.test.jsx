import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

describe("Search and Sort Transactions", () => {
    test("updates page when search input changes", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2024-01-01",
                description: "Chipotle",
                category: "Food",
                amount: -15,
            },
            {
                id: "2",
                date: "2024-01-02",
                description: "Rent",
                category: "Housing",
                amount: -900,
            },
        ]);

        render(<App />);

        const searchInput = screen.getByTestId("search-input");

        fireEvent.change(searchInput, {
            target: { value: "Chip" },
        });

        expect(await screen.findByText("Chipotle")).toBeInTheDocument();

        expect(screen.queryByText("Rent")).not.toBeInTheDocument();
    });

    test("shows all transactions when search is cleared", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2024-01-01",
                description: "Chipotle",
                category: "Food",
                amount: -15,
            },
            {
                id: "2",
                date: "2024-01-02",
                description: "Rent",
                category: "Housing",
                amount: -900,
            },
        ]);

        render(<App />);

        const searchInput = screen.getByTestId("search-input");

        fireEvent.change(searchInput, {
            target: { value: "Chip" },
        });

        fireEvent.change(searchInput, {
            target: { value: "" },
        });

        expect(screen.getByText("Chipotle")).toBeInTheDocument();
        expect(screen.getByText("Rent")).toBeInTheDocument();
    });

    test("shows no transactions when search has no matches", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2024-01-01",
                description: "Chipotle",
                category: "Food",
                amount: -15,
            },
        ]);

        render(<App />);

        fireEvent.change(screen.getByTestId("search-input"), {
            target: { value: "Pizza" },
        });

        expect(screen.queryByText("Chipotle")).not.toBeInTheDocument();
    });

    test("sorts transactions by description", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2024-01-01",
                description: "Zelle Payment",
                category: "Income",
                amount: 20,
            },
            {
                id: "2",
                date: "2024-01-02",
                description: "Apple Store",
                category: "Shopping",
                amount: -30,
            },
        ]);

        render(<App />);

        const select = screen.getByRole("combobox");

        fireEvent.change(select, {
            target: { value: "description" },
        });

        const rows = screen.getAllByRole("row");

        expect(rows[1]).toHaveTextContent("Apple Store");
        expect(rows[2]).toHaveTextContent("Zelle Payment");
    });
});
