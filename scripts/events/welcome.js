const { getTime } = global.utils;

if (!global.temp.welcomeEvent)
  global.temp.welcomeEvent = {};

module.exports = {
  config: {
    name: "welcome",
    version: "2.0",
    author: "Modified by Arafat",
    category: "events"
  },

  onStart: async ({ threadsData, message, event, api }) => {
    if (event.logMessageType !== "log:subscribe") return;

    const { threadID } = event;
    const addedParticipants = event.logMessageData.addedParticipants;

    // Bot added to group
    if (addedParticipants.some(user => user.userFbId === api.getCurrentUserID())) {
      const prefix = global.utils.getPrefix(threadID);
      return message.send(
        `Thanks for adding me!\nMy prefix is: ${prefix}\nType ${prefix}help to see all commands.`
      );
    }

    if (!global.temp.welcomeEvent[threadID])
      global.temp.welcomeEvent[threadID] = {
        joinTimeout: null,
        dataAddedParticipants: []
      };

    global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...addedParticipants);
    clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

    global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async () => {
      const threadData = await threadsData.get(threadID);
      if (threadData?.settings?.sendWelcomeMessage === false) return;

      const participants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
      const dataBanned = threadData?.data?.banned_ban || [];

      for (const user of participants) {
        if (dataBanned.some(b => b.id === user.userFbId)) continue;

        const name = user.fullName;
        const mention = [{ tag: name, id: user.userFbId }];
        let genderText = "him/her";

        try {
          const userInfo = await api.getUserInfo(user.userFbId);
          const gender = userInfo[user.userFbId]?.gender;
          if (gender === 1) genderText = "her";
          else if (gender === 2) genderText = "him";
        } catch (err) {
          console.error("Gender fetch failed:", err.message);
        }

        const msg = `@everyone ${name} is a new member of our group, everyone please welcome ${genderText}.`;

        await message.send({ body: msg, mentions: mention });
      }

      delete global.temp.welcomeEvent[threadID];
    }, 1500);
  }
};
