import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Current from "~/components/forecast/current";
import { getCurrentConditions } from "~/api";
import type { CurrentConditionsForecast } from "~/types/forecast";

vi.mock("~/api");

const mockCurrentConditions: CurrentConditionsForecast = {
  WeatherIcon: 1,
  WeatherText: "Sunny",
  Temperature: {
    Imperial: { Value: 72, Unit: "F" },
    Metric: { Value: 22, Unit: "C" }
  },
  Wind: {
    Direction: { Localized: "NW" },
    Speed: {
      Imperial: { Value: 10, Unit: "mph" },
      Metric: { Value: 16, Unit: "km/h" }
    }
  },
  UVIndex: 5,
  UVIndexText: "High",
  DewPoint: {
    Imperial: { Value: 45, Unit: "F" },
    Metric: { Value: 7, Unit: "C" }
  },
  Visibility: {
    Imperial: { Value: 10, Unit: "mi" },
    Metric: { Value: 16, Unit: "km" }
  }
};

describe("Current Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state correctly", () => {
    vi.mocked(getCurrentConditions).mockImplementation(() => new Promise(() => {}));

    const { container } = render(<Current locationId="12345" />);
    expect(container).toMatchSnapshot();
  });

  it("should render error state correctly", async () => {
    vi.mocked(getCurrentConditions).mockRejectedValue(new Error("API Error"));

    const { container } = render(<Current locationId="12345" />);
    await screen.findByText("Error loading forecast data. Please try again later.");
    expect(container).toMatchSnapshot();
  });

  it("should render current conditions data correctly", async () => {
    vi.mocked(getCurrentConditions).mockResolvedValue(mockCurrentConditions);

    const { container } = render(<Current locationId="12345" />);
    await screen.findByText("Sunny");
    expect(container).toMatchSnapshot();
  });
});
