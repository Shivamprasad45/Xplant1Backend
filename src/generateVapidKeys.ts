// generateVapidKeys.js

import webPush from "web-push";

// Generate VAPID keys
const vapidKeys = webPush.generateVAPIDKeys();

console.log("Public Key:", vapidKeys.publicKey);
console.log("Private Key:", vapidKeys.privateKey);

// Public Key: BI09-2DW-K1NH3cjDG7gBm8oG6Oz8wOQkXYXQmI6eJl0gN22KqXlb8qOwu5rVs_CQFhnOa1Jr0e3qZk6PLem-mc
// Private Key: TxfMku2eqiuM-Dj02BHt-KwEl598NFsHfFvSCPvaKi8
