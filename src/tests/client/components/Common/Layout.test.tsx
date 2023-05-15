import { render } from "@testing-library/react";
import Layout from "../../../../components/Common/Layout";

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "",
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

describe("Layout component", () => {
  it("renders header and main content", () => {
    const { getByRole } = render(
      <Layout>
        <div>Test content</div>
      </Layout>,
    );
    const headerElement = getByRole("banner");
    const mainElement = getByRole("main");
    expect(headerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
});
