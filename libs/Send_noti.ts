import webPush from "web-push";
import { CustomSubscription } from "../type";

const publicVapidKey =
  "BNkXUDivzy5aHZv0A1GZcrlG2mjX9hs00LHhy0YILw0Q9NXUS2JgpjB3fqR_2KSnkDeim7x8egVUzsDQbRJLy58";
const privateVapidKey = "v0HpVsPEy3I505_GKnBr8u2lRCR4m4iUVP75TSDRZ0k";

webPush.setVapidDetails(
  "mailto:codewithharry35434@gmail.com",
  publicVapidKey,
  privateVapidKey
);

export default function SendNotification(
  sub: CustomSubscription,
  _notificationdata: any
) {
  console.log(_notificationdata, "Notification data");

  const notificationPayload: any = {
    title: "Plant care tips",
    body: _notificationdata,
    icon: "https://media.istockphoto.com/id/1777469439/photo/azaleas-flowers-with-leaves-pink-flowers-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=4pSgRgLKXgcGs2Mcc4SJAipRXI2PjX6PyIyjLRP4ONo=",
    badge:
      "https://media.istockphoto.com/id/1777469439/photo/azaleas-flowers-with-leaves-pink-flowers-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=4pSgRgLKXgcGs2Mcc4SJAipRXI2PjX6PyIyjLRP4ONo=",
    actions: [
      {
        action: "open",
        title: "Open",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
    data: {
      plantId: 123,
    },
    dir: "auto",
    image:
      "https://media.istockphoto.com/id/1777469439/photo/azaleas-flowers-with-leaves-pink-flowers-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=4pSgRgLKXgcGs2Mcc4SJAipRXI2PjX6PyIyjLRP4ONo=",
    lang: "en",
    renotify: true,
    requireInteraction: true,
    silent: false,
    timestamp: Date.now(),
    vibrate: [100, 50, 100],
  };
  webPush
    .sendNotification(sub, JSON.stringify(notificationPayload))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

// Public Key: BNkXUDivzy5aHZv0A1GZcrlG2mjX9hs00LHhy0YILw0Q9NXUS2JgpjB3fqR_2KSnkDeim7x8egVUzsDQbRJLy58
// Private Key: v0HpVsPEy3I505_GKnBr8u2lRCR4m4iUVP75TSDRZ0k
