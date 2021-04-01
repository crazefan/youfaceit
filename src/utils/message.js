import { hasWon } from "../utils/index.js";

const formEmbeddedMessage = (messageData, messageThumbnail) => {
  const embeddedMessage = {
    color: 0xde9012,
    title: "YourFaceIt",
    thumbnail: {
      url: ` ${messageThumbnail}`,
    },
    fields: [
      {
        name: "GAME SUMMARY",
        value: `\n\n${messageData.body}`,
      },

      {
        name: "Map info",
        value: `${messageData.mapData}`,
        inline: true,
      },
      {
        name: "Scoreboard",
        value: `${messageData.scoreboard}`,
        inline: true,
      },
    ],
  };
  return embeddedMessage;
};

export const composeMessage = (
  matchData,
  teamTable,
  bestPerformedPlayer,
  leastPerfomedPlayer,
  playerIdList
) => {
  const isVictory = hasWon(matchData, playerIdList)
    ? "Finally a fucking **WIN**!"
    : "You **LOST** again. No wonder.";

  const messageThumbnail = hasWon(matchData, playerIdList)
    ? "https://i.imgur.com/jSq6lKO.jpg"
    : "https://i.imgur.com/1RpNBDa.jpg";

  const bestPerfomer = `Good job, **${bestPerformedPlayer.nickname}**! Keep it up`;
  const worstPerformer = `Hey, noob **${leastPerfomedPlayer.nickname}**. How about you start making some frags?`;

  const mapInfo = [
    `Map: ${matchData.rounds[0].round_stats.Map}`,
    `Score: ${matchData.rounds[0].round_stats.Score}`,
  ];

  const messageData = {
    body: `${isVictory}\n\n${bestPerfomer}\n${worstPerformer}`,
    mapData: `${mapInfo.join("\n")}`,
    scoreboard: `${teamTable}`,
  };

  return formEmbeddedMessage(messageData, messageThumbnail);
};
