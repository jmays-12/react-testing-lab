import { render, screen } from "@testing-library/react";
import App from "../../components/App";

describe("Display Transactions", () => {
    test("displays transactions on startup", async () => {
        setFetchResponse([
            {
                id: "1",
                date: "2019-12-01",
                description: "Paycheck from Bob's Burgers",
                category: "Income",
                amount: 1000,
            },
            {
                id: "2",
                date: "2019-12-02",
                description: "Chipotle",
                category: "Food",
                amount: -17.59,
            },
        ]);

        render(<App />);

        // wait for fetched transactions to render
        expect(
            await screen.findByText("Paycheck from Bob's Burgers"),
        ).toBeInTheDocument();

        expect(screen.getByText("Chipotle")).toBeInTheDocument();

        // verify transaction table headers exist
        expect(
            screen.getByRole("columnheader", { name: /Date/i }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("columnheader", { name: /Description/i }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("columnheader", { name: /Category/i }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("columnheader", { name: /Amount/i }),
        ).toBeInTheDocument();
    });

    test("handles an empty transaction list", async () => {
        setFetchResponse([]);

        render(<App />);

        expect(
            await screen.findByRole("columnheader", { name: /Date/i }),
        ).toBeInTheDocument();

        // no transaction rows should appear
        expect(
            screen.queryByText("Paycheck from Bob's Burgers"),
        ).not.toBeInTheDocument();
    });

    test("handles transactions with missing data", async () => {
        setFetchResponse([
            {
                id: "3",
                date: "2025-01-01",
                description: "",
                category: "Food",
                amount: 10,
            },
        ]);

        render(<App />);

        // table should still load even with incomplete transaction data
        expect(
            await screen.findByRole("columnheader", { name: /Description/i }),
        ).toBeInTheDocument();

        expect(screen.getByText("Food")).toBeInTheDocument();
    });
});
