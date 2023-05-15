import { render, fireEvent, screen, act } from "@testing-library/react";
import Deactivate from "../../../../components/Account/Deactivate";

test("displays the confirmation dialog when the deactivate button is clicked", async () => {
  const handleRemove = jest.fn();
  render(<Deactivate handleRemove={handleRemove} />);

  expect(
    screen.queryByText(/Are you sure you want to deactivate your account?/i),
  ).not.toBeInTheDocument();

  const deactivateButton = screen.getByRole("button", { name: /deactivate account/i });
  await act(async () => {
    fireEvent.click(deactivateButton);
  });

  expect(
    screen.getByText(/Are you sure you want to deactivate your account?/i),
  ).toBeInTheDocument();

  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  act(() => {
    fireEvent.click(cancelButton);
  });

  expect(
    screen.queryByText(/Are you sure you want to deactivate your account?/i),
  ).not.toBeInTheDocument();

  await act(async () => {
    fireEvent.click(deactivateButton);
  });
  const confirmButton = screen.getByRole("button", { name: /deactivate/i });
  act(() => {
    fireEvent.click(confirmButton);
  });

  expect(handleRemove).toHaveBeenCalled();
});
