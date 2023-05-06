
import { render, screen, fireEvent } from "@testing-library/react";
import AvatarDropdown from "../../../../components/Account/AvatarDropdown"
import router from "next/router"
import { signOut } from "next-auth/react";

describe("AvatarDropdown", () => {
    const session = { user: { id: "123", username: "horebgwapo404", email: "test@example.com", image: "/../../../public/tumaponnikolai.jpg", name: "Test User", isNewUser: true }, expires: "2d" };
    const sessionWithoutImage = { user: { id: "123", username: "horebgwapo404", email: "test@example.com", name: "Test User", isNewUser: true }, expires: "2d" };

    test("displays user email address", () => {
        render(<AvatarDropdown session={session} />);
        const emailElement = screen.getByText(session.user.email);
        expect(emailElement).toBeInTheDocument();
    });

    test("displays user image if available", () => {
        render(<AvatarDropdown session={session} />);
        const imageElement = screen.getByRole("img");
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.getAttribute("src")).toEqual(encodeURI(session.user.image));
    });

    test("displays default user icon if image is not available", () => {
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
        const pushSpy = jest.spyOn(router, "push");
        render(<AvatarDropdown session={session} />);
        const buttonElement = screen.getByText("Account Settings");
        fireEvent.click(buttonElement);
        expect(pushSpy).toHaveBeenCalledWith("/account");
        pushSpy.mockRestore();
    });

    // test("signs out when sign out button is clicked", () => {
    //     const signOutSpy = jest.spyOn(signOut, "signOut");
    //     render(<AvatarDropdown session={session} />);
    //     const buttonElement = screen.getByText("Sign Out");
    //     fireEvent.click(buttonElement);
    //     expect(signOutSpy).toHaveBeenCalledWith({ redirect: true, callbackUrl: "/auth/signin" });
    //     signOutSpy.mockRestore();
    // });
});