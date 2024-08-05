import { WeatherData } from "../type";

async function Formula(weather: WeatherData): Promise<string[] | undefined> {
  if (weather === undefined) {
    return;
  }

  if (weather && weather.weather && weather.weather[0].main) {
    const { main, wind, weather: weatherDetails, visibility } = weather;
    const weatherCondition = weatherDetails[0].main;
    const suggestions: string[] = [];

    // General suggestions based on weather conditions
    switch (weatherCondition) {
      case "Clouds":
        suggestions.push("Please take care not to overwater your plant.");
        break;
      case "Rain":
        suggestions.push("Ensure proper drainage to prevent root rot.");
        break;
      case "Sun":
        suggestions.push(
          "Give your plant some sunshine, but avoid midday heat."
        );
        break;
      case "Mist":
        suggestions.push("Keep the soil moist but not waterlogged.");
        break;
      case "Haze":
        suggestions.push(
          "Monitor your plant for any signs of stress due to reduced sunlight."
        );
        break;
      case "Snow":
        suggestions.push("Protect your plant from freezing temperatures.");
        break;
      case "Drizzle":
        suggestions.push(
          "Light rain can be beneficial, but watch for prolonged wet conditions."
        );
        break;
      default:
        suggestions.push("Unknown weather condition.");
    }

    // Temperature-based suggestions
    if (main.temp > 303) {
      // temperature > 30°C
      suggestions.push(
        "It's quite hot. Ensure your plant is not exposed to direct sunlight for too long."
      );
    } else if (main.temp < 283) {
      // temperature < 10°C
      suggestions.push(
        "It's quite cold. Ensure your plant is protected from the cold."
      );
    } else {
      suggestions.push(
        "Temperature is moderate. Good conditions for most plants."
      );
    }

    // Humidity-based suggestions
    if (main.humidity > 80) {
      suggestions.push(
        "Humidity is very high. Watch out for fungal growth on your plant."
      );
    } else if (main.humidity > 60) {
      suggestions.push(
        "Humidity is high. Ensure good air circulation to prevent mold."
      );
    } else if (main.humidity < 30) {
      suggestions.push(
        "Humidity is low. Consider misting your plant to maintain moisture."
      );
    } else {
      suggestions.push("Humidity is at a good level for most plants.");
    }

    // Wind speed-based suggestions
    if (wind.speed > 15) {
      // wind speed > 15 m/s
      suggestions.push(
        "It's very windy. Ensure your plant is protected from strong winds."
      );
    } else if (wind.speed > 5) {
      suggestions.push(
        "It's breezy. Some support might be needed for taller plants."
      );
    } else {
      suggestions.push("Wind conditions are calm. Good for most plants.");
    }

    // Visibility-based suggestions
    if (visibility < 1000) {
      // visibility < 1 km
      suggestions.push(
        "Visibility is low. Be cautious of potential fog affecting sunlight exposure."
      );
    }

    // Additional conditions
    if (main.pressure < 1000) {
      suggestions.push("Pressure is low. Potential for stormy weather.");
    } else if (main.pressure > 1020) {
      suggestions.push("Pressure is high. Expect calm and clear conditions.");
    }

    // Output all suggestions
    return suggestions;
  } else {
    console.log("No weather data available.");
  }
}

export default Formula;
