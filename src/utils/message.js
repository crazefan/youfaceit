import { hasWon } from "./faceit.js";

const formEmbeddedMessage = (messageData, messageThumbnail) => ({
  color: 0xde9012,
  author: {
    name: "YouFaceIt",
    icon_url: "https://i.imgur.com/Kovfkbl.png",
    url: "https://github.com/crazefan/faceitloser",
  },
  thumbnail: {
    url: ` ${messageThumbnail}`,
  },
  fields: [
    {
      name: `Game summary\n\u200b`,
      value: `${messageData.body}\n\u200b`,
    },

    {
      name: "Map info",
      value: `${messageData.mapData}`,
      inline: true,
    },
    {
      name: "Scoreboard",
      value: `\`${messageData.scoreboard}\``,
      inline: true,
    },
  ],
});

export const composeMessage = (
  matchData,
  teamTable,
  bestPerformedPlayer,
  leastPerfomedPlayer,
  playerIdList
) => {
  const isVictory = hasWon(matchData, playerIdList)
    ? ":trophy: Finally a **WIN**! Good job, team."
    : ":cry: You **LOST** again. No wonder.";

  const messageThumbnail = hasWon(matchData, playerIdList)
    ? "https://i.imgur.com/jSq6lKO.jpg"
    : "https://i.imgur.com/1RpNBDa.jpg";

  const bestPerformer = `:first_place: Best player - **${bestPerformedPlayer.nickname}**! Way to go!`;
  const worstPerformer = `:clown: Hey, noob **${leastPerfomedPlayer.nickname}**. How about you start making some frags?`;

  const mapInfo = [
    `Map: ${matchData.rounds[0].round_stats.Map}`,
    `Score: ${matchData.rounds[0].round_stats.Score}`,
  ];

  const messageData = {
    body: `${isVictory}\n\n${bestPerformer}\n${worstPerformer}`,
    mapData: `${mapInfo.join("\n")}`,
    scoreboard: `${teamTable}`,
  };

  return formEmbeddedMessage(messageData, messageThumbnail);
};
