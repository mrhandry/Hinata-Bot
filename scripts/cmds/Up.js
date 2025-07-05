const os = require("os");

module.exports = {
  config: {
    name: "up",
    version: "4.0-up7",
    author: "Amit Max | Mod by Xrotick",
    role: 0,
    shortDescription: { en: "Show bot uptime" },
    longDescription: {
      en: "Displays bot uptime with current time, date, and simple loading."
    },
    category: "system",
    guide: { en: "{p}uptime" }
  },

  onStart: async function ({ api, event }) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const loadStages = [
      "[ █░░░░░░░░░░░░░░ ]",
      "[ █████░░░░░░░░░░ ]",
      "[ █████████░░░░░░ ]",
      "[ █████████████░░ ]",
      "[ ███████████████ ]"
    ];

    try {
      const loading = await api.sendMessage("Loading bot uptime...\n" + loadStages[0], event.threadID);

      for (let i = 1; i < loadStages.length; i++) {
        await delay(250);
        await api.editMessage(`Loading bot uptime...\n${loadStages[i]}`, loading.messageID, event.threadID);
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
HiNaTa Uptime Info...

Uptime : ${uptimeFormatted}
Time   : ${time}
Date   : ${date}

RAM    : ${memoryUsage} MB
OS     : ${os.platform()} (${os.arch()})
Node   : ${process.version}
      `.trim();

      await delay(300);
      await api.editMessage(finalMessage, loading.messageID, event.threadID);

    } catch (err) {
      console.error("Uptime error:", err);
      api.sendMessage("Error: Please try again later.", event.threadID);
    }
  }
};
