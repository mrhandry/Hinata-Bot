const os = require("os");

module.exports = {
  config: {
    name: "up", // এখন 'up' লিখলেই কমান্ড কাজ করবে
    version: "4.0",
    author: "Amit⚡Max | Mod by Xrotick",
    role: 0,
    shortDescription: { en: "Show bot uptime" },
    longDescription: {
      en: "Shows how long the bot has been running with time and date."
    },
    category: "system",
    guide: { en: "{p}up" }
  },

  onStart: async function ({ api, event }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const loadStages = [
      "[ ░░░░░░░░░░░░ ]",
      "[ ███░░░░░░░░ ]",
      "[ ███████░░░░ ]",
      "[ ███████████ ]",
      "[ Done Loading ]"
    ];

    try {
      const loading = await api.sendMessage("Loading uptime...\n" + loadStages[0], event.threadID);

      for (let i = 1; i < loadStages.length; i++) {
        await delay(250);
        await api.editMessage(`Loading uptime...\n${loadStages[i]}`, loading.messageID, event.threadID);
      }

      const memoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      const now = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: true
      });
      const [date, time] = now.split(", ");

      const finalMessage = `
Bot Uptime Info

Uptime : ${uptimeFormatted}
Time   : ${time}
Date   : ${date}

RAM    : ${memoryUsage} MB
OS     : ${os.platform()} (${os.arch()})
Node   :
