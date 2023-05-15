import { render, screen } from "@testing-library/react";
import BoxPage from "../../../../components/Box/BoxPage";

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

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: "123" },
  }),
}));

jest.mock("../../../../utils/trpc", () => ({
  trpc: {
    useQuery: jest.fn().mockReturnValue({
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: {
        id: "1",
        name: "testName",
        username: "testUsername",
        email: "test@gmail.com",
        emailVerified: new Date(),
        image: "",
        isNewUser: false,
        created_at: new Date(),
        updated_at: new Date(),
        boxes: [
          {
            id: "1",
            userId: "1",
            boxTitle: "Box Title",
            isPublic: true,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
      },
    }),
  },
}));

jest.mock("../../../../components/Box/Controls", () => {
  const MockControls = () => <div data-testid="controls" />;
  return MockControls;
});

jest.mock("../../../../components/Box/Components", () => {
  const MockComponents = () => <div data-testid="components" />;
  return MockComponents;
});

jest.mock("../../../../components/Box/Header", () => {
  const MockHeader = () => <div data-testid="header" />;
  return MockHeader;
});

jest.mock("../../../../components/Box/Canvas", () => {
  const MockCanvas = () => <div data-testid="canvas" />;
  return MockCanvas;
});

describe("BoxPage", () => {
  test("it should render without crashing", () => {
    render(<BoxPage />);
    expect(screen.getByTestId("boxComponent")).toBeInTheDocument();
  });

  test("it should render the header component", () => {
    render(<BoxPage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("it should render the canvas component", () => {
    render(<BoxPage />);
    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  test("it should render the controls and components component if user id and box id are equal", () => {
    render(<BoxPage />);
    expect(screen.getByTestId("controls")).toBeInTheDocument();
    expect(screen.getByTestId("components")).toBeInTheDocument();
  });
});
