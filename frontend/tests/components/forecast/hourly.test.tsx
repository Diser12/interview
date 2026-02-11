import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { getHourlyForecast } from "~/api";
import Hourly from "~/components/forecast/hourly";
import type { HourlyForecast } from "~/types/forecast";

vi.mock("~/api");

const mockHourlyForecast: HourlyForecast[] = [
  {
    DateTime: "2024-02-12T10:00:00",
    WeatherIcon: 1,
    IconPhrase: "Sunny",
    PrecipitationProbability: 10,
    Temperature: { Value: 72, Unit: "°F" },
    Wind: {
      Direction: { Localized: "NW" },
      Speed: { Value: 10, Unit: "mph" }
    },
    UVIndex: 5,
    UVIndexText: "High",
    DewPoint: { Value: 45, Unit: "°F" },
    Visibility: { Value: 10, Unit: "mi" }
  },
  {
    DateTime: "2024-02-12T11:00:00",
    WeatherIcon: 2,
    IconPhrase: "Partly Cloudy",
    PrecipitationProbability: 15,
    Temperature: { Value: 73, Unit: "°F" },
    Wind: {
      Direction: { Localized: "NW" },
      Speed: { Value: 12, Unit: "mph" }
    },
    UVIndex: 6,
    UVIndexText: "High",
    DewPoint: { Value: 46, Unit: "°F" },
    Visibility: { Value: 10, Unit: "mi" }
  }
];



describe("Hourly Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state correctly", () => {
    vi.mocked(getHourlyForecast).mockImplementation(() => new Promise(() => {}));

    const { container } = render(<Hourly locationId="12345" />);
    expect(container).toMatchSnapshot();
  });

  it("should render error state correctly", async () => {
    vi.mocked(getHourlyForecast).mockRejectedValue(new Error("API Error"));

    const { container } = render(<Hourly locationId="12345" />);
    await screen.findByText("Error loading forecast data. Please try again later.");
    expect(container).toMatchSnapshot();
  });

  it("should render hourly forecast data correctly", async () => {
    vi.mocked(getHourlyForecast).mockResolvedValue(mockHourlyForecast);

    const { container } = render(<Hourly locationId="12345" />);
    await screen.findByText("Sunny");
    expect(container).toMatchSnapshot();
  });
});
