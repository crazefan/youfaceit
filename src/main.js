import Discord from "discord.js";
import { discordBotToken, playerIdList } from "./config.js";
import { fetchMatchData } from "./api/index.js";
import { handleError } from "./utils/handleError.js";
import {
  getAllStats,
  getTeamIndex,
  hasWon,
  getYourTeamTable,
  getRelevantPlayers,
} from "./utils/index.js";

const bot = new Discord.Client();
const prefix = "!";
const matchID = "1-6db6cb61-fbce-49a9-b611-2e378d1b8209";

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
      await message.channel.send("Your team index is " + getTeamIndex(matchData, playerIdList));
      await message.channel.send(getRelevantPlayers(matchData, playerIdList));

      // await message.channel.send(
      //   hasWon(matchData, playerIdList) ? "Your team won" : "Your team lost"
      // );

      // await message.channel.send(getAllStats(matchData));

      // message.channel.send(getYourTeamTable(matchData, playerIdList));
    }
  } catch (error) {
    //need to hande error separately in handeError.js
    handleError(error);
  }
});

//should be last in the file
bot.login(discordBotToken);
