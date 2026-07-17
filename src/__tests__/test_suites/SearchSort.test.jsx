import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

describe("Search and Sort Transactions", () => {
    test("updates page when search input changes", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2019-12-01",
                description: "Chipotle",
                category: "Food",
                amount: -17.59,
            },
            {
                id: "2",
                date: "2019-12-02",
                description: "Rent",
                category: "Housing",
                amount: -1000,
            },
        ]);

        render(<App />);

        await screen.findByText("Chipotle");

        const searchInput = screen.getByTestId("search-input");

        fireEvent.change(searchInput, {
            target: { value: "Chipotle" },
        });

        expect(screen.getByText("Chipotle")).toBeInTheDocument();
        expect(screen.queryByText("Rent")).not.toBeInTheDocument();
    });

    test("shows all transactions when search is cleared", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2019-12-01",
                description: "Chipotle",
                category: "Food",
                amount: -17.59,
            },
            {
                id: "2",
                date: "2019-12-02",
                description: "Rent",
                category: "Housing",
                amount: -1000,
            },
        ]);

        render(<App />);

        await screen.findByText("Chipotle");

        const searchInput = screen.getByTestId("search-input");

        fireEvent.change(searchInput, {
            target: { value: "Chipotle" },
        });

        expect(screen.queryByText("Rent")).not.toBeInTheDocument();

        fireEvent.change(searchInput, {
            target: { value: "" },
        });

        expect(await screen.findByText("Chipotle")).toBeInTheDocument();
        expect(await screen.findByText("Rent")).toBeInTheDocument();
    });

    test("shows no transactions when search has no matches", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2019-12-01",
                description: "Chipotle",
                category: "Food",
                amount: -17.59,
            },
            {
                id: "2",
                date: "2019-12-02",
                description: "Rent",
                category: "Housing",
                amount: -1000,
            },
        ]);

        render(<App />);

        await screen.findByText("Chipotle");

        const searchInput = screen.getByTestId("search-input");

        fireEvent.change(searchInput, {
            target: { value: "Pizza" },
        });

        expect(screen.queryByText("Chipotle")).not.toBeInTheDocument();
        expect(screen.queryByText("Rent")).not.toBeInTheDocument();
    });

    test("sorts transactions by description", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2019-12-01",
                description: "Zelle Payment",
                category: "Income",
                amount: 100,
            },
            {
                id: "2",
                date: "2019-12-02",
                description: "Apple Store",
                category: "Shopping",
                amount: -50,
            },
        ]);

        render(<App />);

        await screen.findByText("Zelle Payment");

        const sortSelect = screen.getByRole("combobox");

        fireEvent.change(sortSelect, {
            target: { value: "description" },
        });

        const rows = await screen.findAllByRole("row");

        expect(rows[1]).toHaveTextContent("Apple Store");
        expect(rows[2]).toHaveTextContent("Zelle Payment");
    });
});
