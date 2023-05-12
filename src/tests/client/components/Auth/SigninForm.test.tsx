import { render, screen, waitFor } from "@testing-library/react";

// TODO: use fireEvent
import { fireEvent } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import SigninForm from "../../../../components/Auth/SigninForm";
import ResizeObserver from "resize-observer-polyfill";

window.ResizeObserver = ResizeObserver;


jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("SigninForm", () => {
    const mockRouter = { query: {} };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should render the form inputs", () => {
        render(<SigninForm />);
        const emailInput = screen.getByTestId("email");
        expect(emailInput).toBeInTheDocument();
    });

    it("should display validation errors when submitting an invalid email", async () => {
        render(<SigninForm />);
        const emailInput = screen.getByTestId("email");
        const submitButton = screen.getByRole("button", { name: "Sign in" });

        fireEvent.change(emailInput, { target: { value: "invalid-email" } })
        fireEvent.click(submitButton);

        await waitFor(() => {
            const validationError = screen.getByText("Email is badly formatted");
            expect(validationError).toBeInTheDocument();
        });
    });

    it("should call the signIn function with the email when the form is submitted", async () => {
        render(<SigninForm />);
        const emailInput = screen.getByTestId("email");
        const submitButton = screen.getByRole("button", { name: "Sign in" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } })
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith("email", { email: "test@example.com" });
        });
    });

    it("should display an error message when there is an error in the query string", async () => {
        mockRouter.query = { error: "CredentialsSignin" };
        render(<SigninForm />);

        await waitFor(() => {
            const errorMessage = screen.getByText("There has been a problem signing you in. Please try again later.");
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
