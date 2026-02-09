interface Measurement {
    Metric: {
        Value: number;
        Unit: string;
    };
    Imperial: {
        Value: number;
        Unit: string;
    };
}

interface DailyPeriodData {
    Icon: number;
    IconPhrase: string;
    ShortPhrase: string | null;
    LongPhrase: string | null;
    PrecipitationProbability: number | null;
    RainProbability: number | null;
    SnowProbability: number | null;
    IceProbability: number | null;
    ThunderstormProbability: number | null;
    Wind: {
        Direction: {
            Localized: string;
        };
        Speed: Measurement;
    };
}

export interface CurrentConditionsForecast {
    WeatherText: string;
    WeatherIcon: number;
    Temperature: Measurement;
    IsDayTime: boolean;
    DewPoint: Measurement;
    Wind: {
        Direction: {
            Localized: string;
        };
        Speed: Measurement;
    };
    UVIndex: number;
    UVIndexText: string;
    Visibility: Measurement;
    WindChillTemperature: Measurement;
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
    IsDaylight: boolean;
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
    RainProbability: number | null;
    SnowProbability: number | null;
    IceProbability: number | null;
    ThunderstormProbability: number | null;
}