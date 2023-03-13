import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import SignInPage from "@/pages/auth/SignInPage";

describe("SignInPage", () => {
  test("renders sign in form", () => {
    render(<SignInPage />);
    const emailInput = screen.getByL("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
