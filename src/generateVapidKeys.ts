// generateVapidKeys.js

import webPush from "web-push";

// Generate VAPID keys
const vapidKeys = webPush.generateVAPIDKeys();

console.log("Public Key:", vapidKeys.publicKey);
console.log("Private Key:", vapidKeys.privateKey);

// Public Key: BBPuBPUtiQ9XMcGyj_fAuupMTl_-pishcrf2Sk6HVLyQ8E3aJhvDNeiLznsSmmxT-BK52HT-hxLJqzdij23dxuk
// Private Key: jcj5IvHlb6hJ0qbgAlYVJQMBVa74pZrAIxaZK8yjgcg