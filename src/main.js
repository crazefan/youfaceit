import Discord from "discord.js";
import { discordBotToken } from "./config.js";

import { handleError } from "./utils/handleError.js";
import {
  getTeamScoreboard,
  getBestPerformedPlayer,
  getLeastPerformedPlayer,
  getPlayerIdFromNickname,
  getAddedUsersNicknames,
  getAddedUsersIds,
  getLatestCommonGame,
} from "./utils/faceit.js";

import { composeMessage } from "./utils/message.js";
import { fetchMatchData, fetchPlayerHistory } from "./api/index.js";
import { addUser, removeUser, getAddedUsers, duplicateCheck } from "./utils/db.js";

const bot = new Discord.Client();
const prefix = "!";

bot.once("ready", () => {
  console.log("Bot is online");
});

bot.on("message", async (message) => {
  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "show") {
      const playersIdList = getAddedUsersIds();
      const asyncRequests = playersIdList.map(fetchPlayerHistory);
      const histories = await Promise.all(asyncRequests);

      const match = getLatestCommonGame(histories);
      const matchData = await fetchMatchData(match.match_id);
      const playersNicknamesList = getAddedUsersNicknames();
      const teamTable = getTeamScoreboard(matchData, playersNicknamesList);
      const bestPerformedPlayer = getBestPerformedPlayer(matchData, playersNicknamesList);
      const leastPerformedPlayer = getLeastPerformedPlayer(matchData, playersNicknamesList);

      const embeddedMessage = composeMessage(
        matchData,
        teamTable,
        bestPerformedPlayer,
        leastPerformedPlayer,
        playersNicknamesList
      );

      await message.channel.send({ embed: embeddedMessage });
    } else if (command === "add") {
      if (args.length === 1) {
        const [nickname] = args;
        if (duplicateCheck(nickname)) {
          await message.channel.send(`User ${nickname} is already added to the players list`);
        } else {
          const playerId = await getPlayerIdFromNickname(nickname);
          if (!playerId) {
            await message.channel.send(`User ${nickname} was not found, try again.`);
          } else {
            addUser(nickname, playerId);
            await message.channel.send(`User ${nickname} added successfully`);
          }
        }
      } else {
        await message.channel.send("You cannot add multiple users or add an empty user.");
      }
    } else if (command === "remove") {
      if (args.length === 1) {
        const [nickname] = args;
        removeUser(nickname);
        await message.channel.send(`User ${nickname} removed successfully`);
      } else {
        await message.channel.send("You cannot delete multiple users or add an empty user.");
      }
    } else if (command === "list") {
      const addedPlayersList = getAddedUsers()
        .map((player) => player.nickname)
        .join(", "); // I might move this somewhere
      await message.channel.send(`List of added users: ${addedPlayersList}`);
    }
  } catch (error) {
    handleError(error);
  }
});

bot.login(discordBotToken);
