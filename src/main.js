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

const bot = new Discord.Client();
const prefix = "!";
const matchID = "1-705424b1-ca0c-4161-b4f3-83351d348947";

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
    }
  } catch (error) {
    handleError(error);
  }
});

//should be last in the file
bot.login(discordBotToken);
