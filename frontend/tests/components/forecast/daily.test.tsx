import { describe, it, expect, vi, beforeEach } from "vitest";
import Daily from "~/components/forecast/daily";
import { getDailyForecast } from "~/api";
import { render, screen, waitFor } from "@testing-library/react";
import type { DailyForecast } from "~/types/forecast";

vi.mock("~/api");

const mockDailyForecast: DailyForecast[] = [
  {
    Date: "2024-02-12T12:00:00",
    Temperature: {
      Maximum: { Value: 75, Unit: "F" },
      Minimum: { Value: 55, Unit: "F" }
    },
    Day: {
      Icon: 1,
      IconPhrase: "Sunny",
      PrecipitationProbability: 10,
      LongPhrase: "Sunny throughout the day",
      TotalLiquid: { Value: 0, Unit: "in" },
      Wind: {
        Direction: { Localized: "NW" },
        Speed: { Value: 10, Unit: "mph" }
      }
    },
    Night: {
      Icon: 33,
      IconPhrase: "Clear",
      PrecipitationProbability: 5,
      LongPhrase: "Clear night",
      TotalLiquid: { Value: 0, Unit: "in" },
      Wind: {
        Direction: { Localized: "NW" },
        Speed: { Value: 5, Unit: "mph" }
      }
    },
    Sun: { Rise: "2024-02-12T07:00:00", Set: "2024-02-12T18:00:00" },
    Moon: { Rise: "2024-02-12T20:00:00", Set: "2024-02-13T08:00:00" }
  }
];



describe("Daily Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state correctly", () => {
    vi.mocked(getDailyForecast).mockImplementation(() => new Promise(() => {}));
    
    const { container } = render(<Daily locationId="12345" />);
    expect(container).toMatchSnapshot();
  });

  it("should render error state correctly", async () => {
    vi.mocked(getDailyForecast).mockRejectedValue(new Error("API Error"));

    const { container } = render(<Daily locationId="12345" />);
    await screen.findByText("Error loading forecast data. Please try again later.");
    expect(container).toMatchSnapshot();
  });

  it("should render daily forecast data correctly", async () => {
    vi.mocked(getDailyForecast).mockResolvedValue(mockDailyForecast);

    const { container } = render(<Daily locationId="12345" />);
    await screen.findByText("Mon, 2/12 (Day)");
    expect(container).toMatchSnapshot();
  });
});
