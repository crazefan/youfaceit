import { playerIdList } from "../config.js";
import { hasWon } from "../utils/index.js";

const formEmbeddedMessage = (messageBody, messageThumbnail) => {
  const embeddedMessage = {
    color: 0xde9012,
    title: "FACEIT LOSER BOT MESSAGE",
    description: "Your last game stats",
    thumbnail: {
      url: ` ${messageThumbnail}`,
    },
    fields: [
      {
        name: "GAME SUMMARY",
        value: `\n${messageBody}`,
      },
    ],
  };
  return embeddedMessage;
};

export const composeMessage = (matchData, teamTable, bestPerformedPlayer, leastPerfomedPlayer) => {
  const isVictory = hasWon(matchData, playerIdList)
    ? "Finally a fucking **WIN**!"
    : "You **LOST** again. No wonder.";

  const messageThumbnail = hasWon(matchData, playerIdList)
    ? "https://i.imgur.com/jSq6lKO.jpg"
    : "https://i.imgur.com/1RpNBDa.jpg";

  const yourTeamTable = [`Your team scores table:`, `${teamTable}`].join("\n\n");
  const mapInfo = [
    `Map: ${matchData.rounds[0].round_stats.Map}`,
    `Счет: ${matchData.rounds[0].round_stats.Score}`,
  ];
  const bestPerfomer = `Good job, **${bestPerformedPlayer.nickname}**! Keep it up`;
  const worstPerformer = `Hey, noob **${leastPerfomedPlayer.nickname}**. How about you start making some frags?`;

  const messageBody = `${isVictory}\n\n${yourTeamTable}\n\n${mapInfo.join(
    "\n"
  )}\n\n${bestPerfomer}\n${worstPerformer}`;

  return formEmbeddedMessage(messageBody, messageThumbnail);
};
