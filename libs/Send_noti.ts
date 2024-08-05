import webPush from "web-push";
import { CustomSubscription } from "../type";

const publicVapidKey = "BBPuBPUtiQ9XMcGyj_fAuupMTl_-pishcrf2Sk6HVLyQ8E3aJhvDNeiLznsSmmxT-BK52HT-hxLJqzdij23dxuk";
const privateVapidKey = "jcj5IvHlb6hJ0qbgAlYVJQMBVa74pZrAIxaZK8yjgcg";

webPush.setVapidDetails(
  "mailto:codewithharry35434@gmail.com",
  publicVapidKey,
  privateVapidKey
);

export default function SendNotification(
  sub: CustomSubscription,
  _notificationdata: any
) {
  // console.log(_notificationdata,sub, "Notification data");

  const notificationPayload: any = {
    title: "Plant care tips",
    body: _notificationdata,
    icon: "https://media.istockphoto.com/id/1777469439/photo/azaleas-flowers-with-leaves-pink-flowers-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=4pSgRgLKXgcGs2Mcc4SJAipRXI2PjX6PyIyjLRP4ONo=",
    badge: "https://media.istockphoto.com/id/1777469439/photo/azaleas-flowers-with-leaves-pink-flowers-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=4pSgRgLKXgcGs2Mcc4SJAipRXI2PjX6PyIyjLRP4ONo=",
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
    image: "https://media.istockphoto.com/id/1777469439/photo/azaleas-flowers-with-leaves-pink-flowers-isolated-on-white-background-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=4pSgRgLKXgcGs2Mcc4SJAipRXI2PjX6PyIyjLRP4ONo=",
    lang: "en",
    renotify: true,
    requireInteraction: true,
    silent: false,
    timestamp: Date.now(),
    vibrate: [100, 50, 100],
  };

  const options = {
    vapidDetails: {
      subject: "mailto:codewithharry35434@gmail.com",
      publicKey: publicVapidKey,
      privateKey: privateVapidKey,
    },
    TTL: 60 * 60 * 24, // 24 hours
    headers: {
      Urgency: "high",
    },
  };

  webPush
    .sendNotification(sub, JSON.stringify(notificationPayload), options)
    .then((result) =>console.log(result) )
    .catch(error => {
      console.error('Error sending notification:', error);
      console.error('Status Code:', error.statusCode);
      console.error('Headers:', error.headers);
      console.error('Body:', error.body);
      console.error('Endpoint:', error.endpoint);
    });
}
