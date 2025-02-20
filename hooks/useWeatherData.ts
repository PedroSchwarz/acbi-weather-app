import { useSettings } from "@/contexts/SettingsContext";
import { useEffect, useState } from "react";
import { TemperatureUnit } from "./useLocalStorageSettings";

type CityWeatherLocation = {
    name: string;
    country: string;
    localtime: string;
}

type CityWeatherCurrent = {
    temp_f: string;
    temp_c: string;
    condition: any;
}

type CityWeatherData = {
    location: CityWeatherLocation;
    current: CityWeatherCurrent;
}

const apiKey = 'ad7d9b1584c14ff2842100245220803';

export const useWeatherData = (name: string, country: string) => {
    const { settings: { temperatureUnit } } = useSettings();
    const [loading, setLoading] = useState<boolean>(true);
    const [temperature, setTemperature] = useState<string | null>(null);
    const [weatherCondition, setWeatherCondition] = useState<{ text: string; icon: string } | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${name},${country}&aqi=no`);
                const data: CityWeatherData = await response.json();
                setTemperature(temperatureUnit == TemperatureUnit.Celsius ? data.current.temp_c : data.current.temp_f);
                setWeatherCondition(data.current.condition);

                const parsedDate = new Date(data.location.localtime);
                setDate(parsedDate.toDateString());
                setTime(
                    parsedDate.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })
                );
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchWeatherData();
    }, [name, country, temperatureUnit]);

    return { loading, temperature, weatherCondition, date, time };
}