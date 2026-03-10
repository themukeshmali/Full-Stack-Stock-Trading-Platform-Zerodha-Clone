import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TopBar from "./TopBar";

jest.mock("./Menu", () => () => <div data-testid="menu-mock" />);

describe("TopBar Live Indices Component", () => {
  it("renders the NIFTY 50 and SENSEX text headers", () => {
    // Topbar has a Menu which requires routing context but for this test we only want to test indices
    // We can just spy or mock Menu if it fails, but TopBar should render SENSEX natively.
    render(<TopBar />);
    
    expect(screen.getByText("NIFTY 50")).toBeInTheDocument();
    expect(screen.getByText("SENSEX")).toBeInTheDocument();
  });
});
