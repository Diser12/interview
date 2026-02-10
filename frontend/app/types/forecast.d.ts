interface Measurement {
    Value: number;
    Unit: string;
}

interface MeasurementFormats {
    Metric: Measurement;
    Imperial: Measurement;
}

interface DailyPeriodData {
    Icon: number;
    IconPhrase: string;
    LongPhrase: string;
    PrecipitationProbability: number;
    TotalLiquid: Measurement;
    Wind: {
        Direction: {
            Localized: string;
        };
        Speed: Measurement;
    };
}

export interface ForecastLocation {
    LocalizedName: string;
    AdministrativeArea: {
        LocalizedName: string;
    }
}

export interface CurrentConditionsForecast {
    WeatherText: string;
    WeatherIcon: number;
    Temperature: MeasurementFormats;
    IsDayTime: boolean;
    DewPoint: MeasurementFormats;
    Wind: {
        Direction: {
            Localized: string;
        };
        Speed: MeasurementFormats;
    };
    UVIndex: number;
    UVIndexText: string;
    Visibility: MeasurementFormats;
}

export interface DailyForecast {
    Date: string;
    Temperature: {
        Minimum: Measurement;
        Maximum: Measurement;
    };
    Day: DailyPeriodData;
    Night: DailyPeriodData;
    Sun: {
        Rise: string;
        Set: string;
    };
    Moon: {
        Rise: string;
        Set: string;
        Phase: string;
    };
}

export interface HourlyForecast {
    DateTime: string;
    WeatherIcon: number;
    IconPhrase: string;
    Temperature: Measurement;
    Wind: {
        Direction: {
            Localized: string;
        };
        Speed: Measurement;
    };
    DewPoint: Measurement;
    UVIndex: number;
    UVIndexText: string;
    PrecipitationProbability: number;
    Visibility: Measurement;
}