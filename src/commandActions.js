import {
  getTeamScoreboard,
  getBestPerformedPlayer,
  getLeastPerformedPlayer,
  getPlayerIdFromNickname,
  getLatestCommonGame,
  hasWon,
} from "./utils/faceit.js";

import { composeMessage } from "./utils/message.js";
import { fetchMatchData, fetchPlayerHistory } from "./api/index.js";
import { multiLanguageCommandsText } from "./utils/multiLanguageText.js";

import {
  addUser,
  removeUser,
  duplicateCheck,
  getAddedUsersNicknames,
  getAddedUsersIds,
  getServerLanguage,
  setServerLanguage,
} from "./utils/db.js";

export const commandActions = async (message, args) => {
  const [nickname] = args;
  const guildId = message.guild.id;
  const serverLanguage = await getServerLanguage(guildId);
  const text =
    serverLanguage === "en" ? multiLanguageCommandsText().en : multiLanguageCommandsText().ru;

  return [
    {
      command: "show",
      action: async () => {
        const playersIdList = await getAddedUsersIds(guildId);
        const asyncRequests = playersIdList.map(fetchPlayerHistory);
        const histories = await Promise.all(asyncRequests);

        const match = getLatestCommonGame(histories);
        const matchData = await fetchMatchData(match);

        const playersNicknamesList = await getAddedUsersNicknames(guildId);
        const teamScoreboard = getTeamScoreboard(matchData, playersNicknamesList);
        const bestPerformedPlayer = getBestPerformedPlayer(matchData, playersNicknamesList);
        const leastPerformedPlayer = getLeastPerformedPlayer(matchData, playersNicknamesList);
        const isWinner = hasWon(matchData, playersIdList);

        const embeddedMessage = composeMessage(
          matchData,
          isWinner,
          teamScoreboard,
          bestPerformedPlayer,
          leastPerformedPlayer,
          serverLanguage
        );

        await message.channel.send({ embed: embeddedMessage });
      },
    },
    {
      command: "add",
      action: async () => {
        if (args.length !== 1) {
          await message.channel.send(text.add.errorMultipleUsers);
          return;
        }

        if (await duplicateCheck(nickname, guildId)) {
          await message.channel.send(text.add.errorExists);
          return;
        }

        const playerId = await getPlayerIdFromNickname(nickname);
        if (!playerId) {
          await message.channel.send(text.add.errorNotFound);
          return;
        }

        addUser(nickname, playerId, guildId);
        await message.channel.send(text.add.success);
      },
    },

    {
      command: "remove",
      action: async () => {
        if (args.length === 1) {
          removeUser(nickname, guildId);
          await message.channel.send(text.remove.success);
          return;
        }
        await message.channel.send(text.remove.errorMultiple);
      },
    },
    {
      command: "list",
      action: async () => {
        const addedPlayersList = await getAddedUsersNicknames(guildId);
        await message.channel.send(`${text.list} ${addedPlayersList.join(", ")}`);
      },
    },

    {
      command: "help",
      action: async () => {
        await message.channel.send(text.help);
      },
    },
    {
      command: "ru",
      action: async () => {
        await setServerLanguage(guildId, "ru");
        await message.channel.send("Теперь язык бота - русский.");
      },
    },
    {
      command: "en",
      action: async () => {
        await setServerLanguage(guildId, "en");
        await message.channel.send("Bot language is set to English.");
      },
    },
  ];
};
