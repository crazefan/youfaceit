import { playerIdList } from "../config.js";
import { fetchMatchData } from "../api/index.js";
import { hasWon } from "../utils/index.js";

const formEmbeddedMessage = (messageBody) => {
  const embeddedMessage = {
    color: 0xde9012,
    title: "FaceIt Stats",
    url: "https://discord.js.org",
    author: {
      name: "FaceIt bot",
      //   icon_url: "https://i.imgur.com/wSTFkRM.png",
      url: "https://discord.js.org",
    },
    description: "Your last game stats",
    thumbnail: {
      //make picture conditional
      url: "https://i.imgur.com/wSTFkRM.png",
    },
    fields: [
      {
        name: "So, players, I have a summary to tell",
        value: `${messageBody}`,
      },
      {
        name: "\u200b",
        value: "\u200b",
        inline: false,
      },
    ],
  };
  return embeddedMessage;
};

export const composeMessage = (matchData, teamTable) => {
  const isVictory = hasWon(matchData, playerIdList)
    ? "Finally a fucking win"
    : "Still suck at CS:GO? How's the taste of loss on your lips?";

  const yourTeamTable = [`Your team scores table:`, `${teamTable}`].join("\n");

  const messageBody = `${isVictory}\n${yourTeamTable}`;
  console.log(messageBody);
  return formEmbeddedMessage(messageBody);
};
