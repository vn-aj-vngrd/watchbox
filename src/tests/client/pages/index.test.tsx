import { render, screen } from "@testing-library/react";
import Home from "../../../pages/index";
import React from "react";

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { isNewUser: false } } }),
}));

jest.mock("../../../utils/session", () => ({
  getServerSideSession: jest.fn(),
}));

jest.mock("../../../utils/trpc", () => ({
  trpc: {
    useQuery: jest.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: [],
    }),
    useMutation: jest.fn().mockReturnValue({
      mutateAsync: jest.fn(),
    }),
  },
}));

describe("Home page", () => {
  it("should render boxes component when mode is 'boxes'", () => {
    render(<Home />);

    const boxesComponent = screen.getByTestId("component");
    expect(boxesComponent).toBeInTheDocument();
  });
});
