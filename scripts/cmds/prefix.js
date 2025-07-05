module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "Arafat Hassan",
    countDown: 3,
    role: 0,
    description: "Show the global prefix",
    category: "Configuration",
    guide: {
      en: "{pn} - Show the current global prefix"
    }
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "prefix") {
      const globalPrefix = global.GoatBot.config.prefix;
      return message.reply(
        `Grobal Prefix: ${globalPrefix}\n` +
        `Admin: Arafat Hassan`
      );
    }
  }
};
