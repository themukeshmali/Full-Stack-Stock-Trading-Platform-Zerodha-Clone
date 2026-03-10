import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";

jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve({ data: { message: "Mock Success" } }))
}));

describe("Signup / Login Unified Component", () => {
  it("renders the Signup view by default", () => {
    render(
      <Signup />
    );
    
    // Check if default state is Signup
    expect(screen.getByText(/Signup now/i)).toBeInTheDocument();
    
    // The email field MUST be present if it's signup
    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();

    // The button should say Sign up
    expect(screen.getByRole("button", { name: /Sign up/i })).toBeInTheDocument();

    // Should prompt the user to login if they already have an account
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });

  it("toggles to Login view when the user clicks 'Login here'", () => {
    render(
      <Signup />
    );

    // Find and click the toggle 
    const loginToggleBtn = screen.getByText("Login here");
    fireEvent.click(loginToggleBtn);

    // Component should dynamically swap the UI
    expect(screen.getByText(/Login to Kite/i)).toBeInTheDocument();

    // In Login mode, Email should disappear leaving only Full Name & Password
    expect(screen.queryByPlaceholderText(/name@example.com/i)).not.toBeInTheDocument();

    // Button should now trigger a Login
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();

    // Prompt should dynamically swap
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });
});
