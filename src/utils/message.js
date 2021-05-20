import { multiLanguageEmbedText } from "./multiLanguageText.js";

const formEmbeddedMessage = (messageData) => {
  return {
    color: 0xde9012,
    author: {
      name: "YouFaceIt",
      icon_url: "https://i.imgur.com/Kovfkbl.png",
      url: "https://github.com/crazefan/faceitloser",
    },
    thumbnail: {
      url: messageData.messageThumbnail,
    },
    fields: [
      {
        name: `${messageData.names.gameSummary}\n\u200b`,
        value: `${messageData.body}\n\u200b`,
      },

      {
        name: messageData.names.mapInfo,
        value: messageData.mapData,
        inline: true,
      },
      {
        name: messageData.names.scoreboard,
        value: `\`${messageData.scoreboard}\``,
        inline: true,
      },
    ],
  };
};

export const composeMessage = (
  matchData,
  hasWon,
  teamTable,
  bestPerformedPlayer,
  leastPerfomedPlayer,
  serverLanguage
) => {
  const text = serverLanguage === "en" ? multiLanguageEmbedText().en : multiLanguageEmbedText().ru;
  const isVictory = hasWon ? text.isVictory.win : text.isVictory.lose;

  const messageThumbnail = hasWon
    ? "https://i.imgur.com/jSq6lKO.jpg"
    : "https://i.imgur.com/1RpNBDa.jpg";

  const bestPerformer = `${text.bestPerformer.begin} - **${bestPerformedPlayer.nickname}**! ${text.bestPerformer.end}`;
  const worstPerformer = `${text.worstPerformer.begin} **${leastPerfomedPlayer.nickname}**. ${text.worstPerformer.end}`;

  const mapInfo = [
    `${text.mapInfo.map} ${matchData.rounds[0].round_stats.Map}`,
    `${text.mapInfo.score} ${matchData.rounds[0].round_stats.Score}`,
  ];

  const messageData = {
    body: `${isVictory}\n\n${bestPerformer}\n${worstPerformer}`,
    mapData: mapInfo.join("\n"),
    scoreboard: teamTable,
    names: text.names,
    messageThumbnail: messageThumbnail,
  };

  return formEmbeddedMessage(messageData);
};
