import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import EntryHeader from "../../../../components/Entry/EntryHeader";

jest.mock("@prisma/client");

describe("EntryHeader", () => {
  const updateEntryComponent = jest.fn();
  const props = {
    boxId: "1",
    id: "1",
    title: "My Entry",
    status: 0,
    updateEntryComponent,
  };

  test("displays watch status dropdown", async () => {
    render(<EntryHeader {...props} />);
    const dropdownButton = screen.getByText("Planned");
    fireEvent.click(dropdownButton);
    const dropdownMenu = screen.getByTestId("dropdown-menu");
    await waitFor(() => expect(dropdownMenu).toBeInTheDocument());

    const watchingText = screen.getByText("Watching");
    const droppedText = screen.getByText("Dropped");

    expect(watchingText).toBeInTheDocument();
    expect(droppedText).toBeInTheDocument();
  });

  // test("updates watch status on dropdown click", async () => {
  //   render(<EntryHeader {...props} />);
  //   const dropdownButton = screen.getByText("Planned");
  //   fireEvent.click(dropdownButton);

  //   const watchingText = screen.getByText("Watching");

  //   await waitFor(() => expect(watchingText).toBeInTheDocument());
  //   const watchingOption = watchingText;
  //   fireEvent.click(watchingOption);
  //   expect(updateEntryComponent).toHaveBeenCalledWith({ status: 1 });
  // });
});
