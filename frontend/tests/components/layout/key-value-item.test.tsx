import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import KeyValueItem from "~/components/layout/key-value-item";

describe("KeyValueItem Component", () => {
  it("should render correctly", () => {
    const { container } = render(<KeyValueItem label="Test Key" value="Test Value" />);
    expect(container).toMatchSnapshot();
  });
});
