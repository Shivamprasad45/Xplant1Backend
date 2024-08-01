import axios from "axios";

import { Enter_Plant_coords } from "../type";

const fetchweather = async (items: Enter_Plant_coords): Promise<any> => {
  try {
    const result = `https://api.openweathermap.org/data/2.5/weather?lat=${items.late}&lon=${items.long}&appid=${process.env.OPENWEATHER_API}`;
    const { data } = await axios.get(result);
    return data;
  } catch (error) {
    console.error(
      `Error fetching weather data for plant at lat: ${items.late}, lon: ${items.long}`,
      error
    );
  }
};

export default fetchweather;
