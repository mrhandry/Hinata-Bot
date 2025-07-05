const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "Arafat Hassan",
    countDown: 5,
    role: 0,
    description: {
      en: "Display basic bot information"
    },
    category: "info",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    return message.reply(`Bot Name : Hinata
Total Commands : 270
Admin : Arafat Hassan`);
  }
};
