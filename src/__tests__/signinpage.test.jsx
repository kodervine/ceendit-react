import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import SignInPage from "@/pages/auth/SignInPage";

describe("SignInPage", () => {
  test("renders sign in form", () => {
    render(<SignInPage />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
