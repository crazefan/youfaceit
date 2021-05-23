import { multiLanguageEmbedText } from "./multiLanguageText.js";

export const composeMessage = (
  matchData,
  hasWon,
  teamScoreboard,
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

  const mapInfo = `${text.mapInfo.map} ${matchData.rounds[0].round_stats.Map}\n${text.mapInfo.score} ${matchData.rounds[0].round_stats.Score}`;

  return {
    color: 0xde9012,
    author: {
      name: "YouFaceIt",
      icon_url: "https://i.imgur.com/Kovfkbl.png",
      url: "https://github.com/crazefan/faceitloser",
    },
    thumbnail: {
      url: messageThumbnail,
    },
    fields: [
      {
        name: `${text.names.gameSummary}\n\u200b`,
        value: `${isVictory}\n\n${bestPerformer}\n${worstPerformer}\n\u200b`,
      },

      {
        name: text.names.mapInfo,
        value: mapInfo,
        inline: true,
      },
      {
        name: text.names.scoreboard,
        value: `\`${teamScoreboard}\``,
        inline: true,
      },
    ],
  };
};
