import Discord from "discord.js";
import { discordBotToken, playerIdList } from "./config.js";

import { handleError } from "./utils/handleError.js";
import {
  getTeamScoreboard,
  getBestPerformedPlayer,
  getLeastPerformedPlayer,
} from "./utils/index.js";

import { composeMessage } from "./utils/message.js";
import { fetchMatchData } from "./api/index.js";
import { addUser, removeUser, showAddedUsers, duplicateCheck } from "./utils/db.js";

const bot = new Discord.Client();
const prefix = "!";
const matchID = "1-9de1b5f2-bd53-46ad-9505-28e690e35329";

bot.once("ready", () => {
  console.log("Bot is online");
});

bot.on("message", async (message) => {
  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "show") {
      const matchData = await fetchMatchData(matchID);
      console.log(getBestPerformedPlayer(matchData, playerIdList));

      const teamTable = getTeamScoreboard(matchData, playerIdList);
      const bestPerformedPlayer = getBestPerformedPlayer(matchData, playerIdList);
      const leastPerformedPlayer = getLeastPerformedPlayer(matchData, playerIdList);
      const embeddedMessage = composeMessage(
        matchData,
        teamTable,
        bestPerformedPlayer,
        leastPerformedPlayer
      );
      await message.channel.send({ embed: embeddedMessage });
    } else if (command === "add") {
      if (args.length === 1) {
        const [nickname] = args;
        if (duplicateCheck(nickname)) {
          await message.channel.send(`User ${nickname} is already added to the players list`);
        } else {
          addUser(nickname);
          await message.channel.send(`User ${nickname} added successfully`);
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
      await message.channel.send(`List of added users: ${showAddedUsers().join(", ")}`);
    }
  } catch (error) {
    handleError(error);
  }
});

bot.login(discordBotToken);
