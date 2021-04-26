import {
  getTeamScoreboard,
  getBestPerformedPlayer,
  getLeastPerformedPlayer,
  getPlayerIdFromNickname,
  getLatestCommonGame,
} from "./utils/faceit.js";

import { composeMessage } from "./utils/message.js";
import { fetchMatchData, fetchPlayerHistory } from "./api/index.js";

import {
  addUser,
  removeUser,
  duplicateCheck,
  getAddedUsersNicknames,
  getAddedUsersIds,
} from "./utils/db.js";

export const commandActions = (message, args) => {
  const [nickname] = args;
  const guildId = message.guild.id;

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

        const embeddedMessage = composeMessage(
          matchData,
          teamScoreboard,
          bestPerformedPlayer,
          leastPerformedPlayer,
          playersNicknamesList
        );

        await message.channel.send({ embed: embeddedMessage });
      },
    },
    {
      command: "add",
      action: async () => {
        if (args.length !== 1) {
          await message.channel.send("You cannot add multiple users or add an empty user.");
          return;
        }

        if (await duplicateCheck(nickname, guildId)) {
          await message.channel.send(`User ${nickname} is already added to the players list`);
          return;
        }

        const playerId = await getPlayerIdFromNickname(nickname);
        if (!playerId) {
          await message.channel.send(`User ${nickname} was not found, try again.`);
          return;
        }

        addUser(nickname, playerId, guildId);
        await message.channel.send(`User ${nickname} added successfully`);
      },
    },

    {
      command: "remove",
      action: async () => {
        if (args.length === 1) {
          removeUser(nickname, guildId);
          await message.channel.send(`User ${nickname} removed successfully`);
          return;
        }
        await message.channel.send("You cannot delete multiple users or remove an empty user.");
      },
    },
    {
      command: "list",
      action: async () => {
        const addedPlayersList = await getAddedUsersNicknames(guildId);
        await message.channel.send(`List of added users: ${addedPlayersList.join(", ")}`);
      },
    },

    {
      command: "help",
      action: async () => {
        await message.channel.send(
          `\`!add [FaceIt nickname]\` - add a nickname to server's watchlist \n\`!remove [FaceIt nickname]\` - remove player from the watchlist\n\`!list\` - show the watchlist \n\`!show\` - show the latest game info and performance summary`
        );
      },
    },
  ];
};
