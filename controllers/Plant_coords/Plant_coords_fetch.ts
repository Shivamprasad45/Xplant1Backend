import { Request, Response } from "express";
import Plants_coordinates from "../../Models/Plant_coordes";
import fetchweather from "../../libs/weatherfetch";
import { Enter_Plant_coords } from "../../type";
import Formula from "../../libs/formula";

import SendNotification from "../../libs/Send_noti";

export async function getPlantsCoordinatesByUserId(
  req: Request,
  res: Response
): Promise<void> {
  const uniqueCoordinates = new Map();

  try {
    const plantsCoordinates = await Plants_coordinates.find();

    plantsCoordinates.forEach((item:Enter_Plant_coords) => {
      // Create a unique key combining UserId, long, and late
      const key = `${item.UserId}-${item.late}-${item.long}`;

      // Check if the key already exists in the map
      if (!uniqueCoordinates.has(key)) {
        // If not, add the item to the map
        uniqueCoordinates.set(key, item);
      }
    });

    // Convert the map back to an array of unique items
    const uniqueData:Enter_Plant_coords[] = Array.from(uniqueCoordinates.values());

uniqueData.map(async(plant_coords:Enter_Plant_coords)=>{


 const weatherdata= await fetchweather(plant_coords)
  // Check if weather has changed significantly

if (hasWeatherChanged(plant_coords.lastWeatherState,weatherdata)) {
  const suggestions=await Formula(weatherdata)
const send_Notifications= await SendNotification(plant_coords.subscription,suggestions)
// console.log(send_Notifications)



plant_coords.lastWeatherState=weatherdata;

await Plants_coordinates.findByIdAndUpdate({_id:plant_coords._id},{lastWeatherState:weatherdata}, { new: true })

}
})

    res.status(200).json(uniqueData);
  } catch (error: any) {
    console.error(`Error fetching plants coordinates for user: ${error.message}`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Function to check if weather has changed significantly

// Function to check if weather has changed significantly
function hasWeatherChanged(lastWeatherState: any, newWeatherState: any): boolean {
  if (!lastWeatherState) return true;

  const tempDifference = Math.abs(lastWeatherState.main.temp - newWeatherState.main.temp);
  const humidityDifference = Math.abs(lastWeatherState.main.humidity - newWeatherState.main.humidity);
  const windSpeedDifference = Math.abs(lastWeatherState.wind.speed - newWeatherState.wind.speed);

  const significantChangeThreshold = {
    temperature: 2, // degrees
    humidity: 5, // percentage
    windSpeed: 2, // m/s
  };

  return (
    tempDifference > significantChangeThreshold.temperature ||
    humidityDifference > significantChangeThreshold.humidity ||
    windSpeedDifference > significantChangeThreshold.windSpeed
  );
}
