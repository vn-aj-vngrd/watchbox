import { render, fireEvent, act } from "@testing-library/react";
import DeleteBox from "../../../../components/Box/DeleteBox";

describe("DeleteBox", () => {
  it("should render the DeleteBox button", () => {
    const { getByText } = render(<DeleteBox onDeleteBox={jest.fn()} />);
    expect(getByText(/delete box/i)).toBeInTheDocument();
  });

  it("should open the delete confirmation dialog when the DeleteBox button is clicked", async () => {
    const { getByText } = render(<DeleteBox onDeleteBox={jest.fn()} />);
    await act(async () => {
      fireEvent.click(getByText(/delete box/i));
    });
    expect(getByText(/are you sure you want to delete this box/i)).toBeInTheDocument();
  });

  it("should call the onDeleteBox function when the Delete button is clicked", async () => {
    const onDeleteBoxMock = jest.fn();
    const { getByText } = render(<DeleteBox onDeleteBox={onDeleteBoxMock} />);
    await act(async () => {
      fireEvent.click(getByText(/delete box/i));
    });
    fireEvent.click(getByText(/Delete/, { selector: "button" }));
    expect(onDeleteBoxMock).toHaveBeenCalledTimes(1);
  });

  it("should close the delete confirmation dialog when the Cancel button is clicked", async () => {
    const { getByText, queryByText } = render(<DeleteBox onDeleteBox={jest.fn()} />);
    await act(async () => {
      fireEvent.click(getByText(/delete box/i));
    });
    fireEvent.click(getByText(/cancel/i));
    expect(queryByText(/are you sure you want to delete this box/i)).toBeNull();
  });
});