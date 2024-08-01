import { Request, Response } from "express";
import NodeCache from "node-cache";
import fetchWeather from "../../libs/weatherfetch";
import webPush from "web-push";
import Plants_coordinates from "../../Models/Plant_coordes";
import { Enter_Plant_coords } from "../../type";
import Formula from "../../libs/formula";
import SendNotification from "../../libs/Send_noti";

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

export async function getPlantsCoordinatesByUserId(
  req: Request,
  res: Response
): Promise<Enter_Plant_coords | any> {
  try {
    const plantsCoordinates = await Plants_coordinates.find();

    plantsCoordinates.map(async (item: Enter_Plant_coords) => {
      const weatherdata = await fetchWeather(item);
      const suggestions = await Formula(weatherdata);
      console.log(suggestions, "clg suggestions");
      await SendNotification(item.subscription, suggestions);
    });
    await Promise.all(plantsCoordinates);
    res.status(200).json("got it");
  } catch (error) {
    console.error(`Error fetching plants coordinates for user`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
