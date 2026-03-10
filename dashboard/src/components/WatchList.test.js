import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import WatchList from "./WatchList";
import { watchList } from "../data/data";

jest.mock("./BuyActionWindow", () => () => <div data-testid="buy-window-mock" />);

// WatchList maps over DoughnutChart which uses Canvas, and MaterialUI.
// To stop rendering bugs in JSDOM, we mock out Recharts/ChartJS
jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null
}));

describe("WatchList Filtering Component", () => {
  it("renders the search input component", () => {
    render(<WatchList />);
    const searchInput = screen.getByPlaceholderText(/Search eg:infy/i);
    expect(searchInput).toBeInTheDocument();
  });

  it("renders the total element count directly from mapping the data payload", () => {
    render(<WatchList />);
    // Initial render should show the full list count
    const totalCount = watchList.length;
    expect(screen.getByText(new RegExp(`${totalCount} / ${totalCount}`, "i"))).toBeInTheDocument();
  });
});
