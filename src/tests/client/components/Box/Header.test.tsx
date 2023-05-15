import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Header from "../../../../components/Box/Header";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: {
      user: {
        id: "1",
        name: "John",
      },
    },
  }),
}));

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
  },
}));

describe("Header", () => {
  const box = {
    id: "1",
    name: "testuser",
    username: "testuser",
    email: null,
    emailVerified: null,
    image: null,
    isNewUser: false,
    created_at: new Date(2022, 4, 1, 8, 0, 0),
    updated_at: new Date(2022, 4, 1, 8, 0, 0),
    boxes: [
      {
        id: "1",
        userId: "1",
        boxTitle: "My Box",
        isPublic: false,
        created_at: new Date(2022, 4, 1, 8, 0, 0),
        updated_at: new Date(2022, 4, 1, 8, 0, 0),
      },
    ],
  };

  const favoriteBox = {
    id: "1",
    userId: "1",
    boxId: "1",
    created_at: new Date(2022, 4, 1, 8, 0, 0),
  };

  const refetch = jest.fn();

  it("renders box title", () => {
    render(<Header box={box} favoriteBox={favoriteBox} id={"1"} temp={["1"]} refetch={refetch} />);
    const title = screen.getByText("My Box");
    expect(title).toBeInTheDocument();
  });

  it("allows editing box title", async () => {
    render(<Header box={box} favoriteBox={favoriteBox} id={"1"} temp={["1"]} refetch={refetch} />);
    const title = screen.getByText("My Box");
    fireEvent.click(title);
    fireEvent.input(title, { target: { textContent: "New Box Title" } });
    fireEvent.blur(title);
    await waitFor(() => expect(screen.getByText("New Box Title")).toBeInTheDocument());
  });

  it("shows error if title exceeds 25 characters", async () => {
    render(<Header box={box} favoriteBox={favoriteBox} id={"1"} temp={["1"]} refetch={refetch} />);
    const title = screen.getByText("My Box");
    fireEvent.click(title);
    fireEvent.input(title, { target: { textContent: "This title exceeds 25 characters limit" } });
    fireEvent.blur(title);
    await waitFor(() =>
      expect(screen.getByText("This title exceeds 25 characters limit")).toBeInTheDocument(),
    );
  });

  it("toggles favorite box", () => {
    render(<Header box={box} favoriteBox={favoriteBox} id={"1"} temp={["1"]} refetch={refetch} />);
    const favoriteButton = screen.getByLabelText("Favorite");
    expect(screen.getByLabelText("Favorited")).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    expect(screen.getByLabelText("Unfavorited")).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    expect(screen.getByLabelText("Favorited")).toBeInTheDocument();
  });

  it("toggles box privacy", async () => {
    render(<Header box={box} favoriteBox={favoriteBox} id={"1"} temp={["1"]} refetch={refetch} />);
    const moreOptions = screen.getByLabelText("More options");

    await act(async () => {
      fireEvent.click(moreOptions);
    });
    expect(screen.getByLabelText("Private")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Privacy"));

    await act(async () => {
      fireEvent.click(moreOptions);
    });
    expect(screen.getByLabelText("Public")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Privacy"));

    await act(async () => {
      fireEvent.click(moreOptions);
    });
    expect(screen.getByLabelText("Private")).toBeInTheDocument();
  });
});
