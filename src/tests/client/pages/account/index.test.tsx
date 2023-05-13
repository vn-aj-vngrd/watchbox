import { act, render, screen } from "@testing-library/react";
import Index from "../../../../pages/account/index";
import React from 'react';

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { isNewUser: false } } }),
}));

jest.mock("../../../../utils/session", () => ({
  getServerSideSession: jest.fn(),
}));

jest.mock("../../../../utils/trpc", () => ({
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

jest.mock('../../../../components/Account/Settings',
  () => {
    const MockSettings = () => <div data-testid="settings" />;
    return MockSettings;
  }
);

describe("Settings page", () => {
  it("renders entry header component", async () => {
    await act(() => render(<Index />));
    expect(screen.getByTestId("settings")).toBeInTheDocument();
  });

});