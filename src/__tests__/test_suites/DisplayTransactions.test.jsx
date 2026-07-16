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

        // verify transaction table loads
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

        // verify transactions display after fetch
        expect(
            await screen.findByText("Paycheck from Bob's Burgers"),
        ).toBeInTheDocument();

        expect(screen.getByText("Chipotle")).toBeInTheDocument();
    });

    test("handles an empty transaction list", async () => {
        setFetchResponse([]);

        render(<App />);

        expect(
            screen.getByRole("columnheader", { name: /Date/i }),
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Paycheck from Bob's Burgers"),
        ).not.toBeInTheDocument();
    });
});
