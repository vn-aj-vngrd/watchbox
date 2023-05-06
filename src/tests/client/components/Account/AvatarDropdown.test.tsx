import { render, screen, fireEvent } from "@testing-library/react";
import AvatarDropdown from "../components/AvatarDropdown";

describe("AvatarDropdown", () => {
    const session = { user: { email: "test@example.com", image: "test.jpg", name: "Test User" } };

    test("displays user email address", () => {
        render(<AvatarDropdown session={session} />);
        const emailElement = screen.getByText(session.user.email);
        expect(emailElement).toBeInTheDocument();
    });

    test("displays user image if available", () => {
        render(<AvatarDropdown session={session} />);
        const imageElement = screen.getByRole("img");
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.getAttribute("src")).toEqual(session.user.image);
    });

    test("displays default user icon if image is not available", () => {
        const sessionWithoutImage = { user: { email: "test@example.com", name: "Test User" } };
        render(<AvatarDropdown session={sessionWithoutImage} />);
        const iconElement = screen.getByRole("img");
        expect(iconElement).toBeInTheDocument();
        expect(iconElement.getAttribute("src")).toBeFalsy();
    });

    test("opens menu when button is clicked", () => {
        render(<AvatarDropdown session={session} />);
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        const menuElement = screen.getByRole("menu");
        expect(menuElement).toBeInTheDocument();
    });

    test("redirects to account page when account settings button is clicked", () => {
        const pushSpy = jest.spyOn(require("next/router"), "push");
        render(<AvatarDropdown session={session} />);
        const buttonElement = screen.getByText("Account Settings");
        fireEvent.click(buttonElement);
        expect(pushSpy).toHaveBeenCalledWith("/account");
        pushSpy.mockRestore();
    });

    test("signs out when sign out button is clicked", () => {
        const signOutSpy = jest.spyOn(require("next-auth/react"), "signOut");
        render(<AvatarDropdown session={session} />);
        const buttonElement = screen.getByText("Sign Out");
        fireEvent.click(buttonElement);
        expect(signOutSpy).toHaveBeenCalledWith({ redirect: true, callbackUrl: "/auth/signin" });
        signOutSpy.mockRestore();
    });
});