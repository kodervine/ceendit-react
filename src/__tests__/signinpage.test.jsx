import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SignInPage from "../pages/SignInPage";

describe("SignInPage test", () => {
  // test goes here
  est("should show title all the time", () => {
    render(
      <SignInPage title="Testing">
        <Button>Log in</Button>
      </SignInPage>
    );

    expect(screen.getByText(/Testing/i)).toBeDefined();
  });
});
