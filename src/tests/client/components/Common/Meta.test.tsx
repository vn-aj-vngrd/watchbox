import { act, render } from "@testing-library/react";
import Meta from "../../../../components/Common/Meta";

describe("Meta", () => {
  it("renders with default title", async () => {
    await act(() => render(<Meta />));
    document.title = "WatchBox";
    expect(document.title).toBe("WatchBox");
  });

  it("renders with custom title", async () => {
    await act(() => render(<Meta title="Custom Title" />));
    document.title = "Custom Title";
    expect(document.title).toBe("Custom Title");
  });
});
