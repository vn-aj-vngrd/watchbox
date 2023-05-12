import { render, screen, fireEvent } from "@testing-library/react";
import EntryHeader from "../../../../components/Entry/EntryHeader";
import router from "next/router";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
    };
  },
}));

describe("EntryHeader component", () => {
  const defaultProps = {
    boxId: "1",
    id: "1",
    title: "Example title",
    status: 0,
    updateEntryComponent: jest.fn(),
  };

  // test("clicking back button navigates to box page", () => {
  //   render(<EntryHeader {...defaultProps} />);
  //   fireEvent.click(screen.getByText("Back"));
  //   expect(router.push).toHaveBeenCalledWith("/box/1");
  // });

  // test("clicking watch status dropdown displays options", () => {
  //   render(<EntryHeader {...defaultProps} />);
  //   fireEvent.click(screen.getByText("Planned"));
  //   expect(screen.getByText("Watching")).toBeVisible();
  //   expect(screen.getByText("On Hold")).toBeVisible();
  //   expect(screen.getByText("Watched")).toBeVisible();
  //   expect(screen.getByText("Dropped")).toBeVisible();
  // });

//   test("clicking watch status option updates status", () => {
//     const updateStatusMock = jest.fn();
//     jest.spyOn(require("../../utils/trpc"), "trpc").mockReturnValue({
//       useQuery: () => ({ data: { boxTitle: "Example box" } }),
//       useMutation: () => ({ mutateAsync: updateStatusMock }),
//     });

//     render(<EntryHeader {...defaultProps} />);
//     fireEvent.click(screen.getByText("Planned"));
//     fireEvent.click(screen.getByText("On Hold"));
//     expect(defaultProps.updateEntryComponent).toHaveBeenCalledWith({ status: 2 });
//     expect(updateStatusMock).toHaveBeenCalledWith({ id: "1", status: 2 });
//     expect(screen.getByText("On Hold")).toHaveClass("bg-orange-500");
//   });
});
