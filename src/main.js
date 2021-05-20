import Discord from "discord.js";

import { discordBotToken } from "./config.js";

import { handleError } from "./utils/handleError.js";
import { commandActions } from "./commandActions.js";

const bot = new Discord.Client();
const prefix = "!yf-";

bot.once("ready", () => {
  console.log("YouFaceIt bot is online!");
});

bot.on("message", async (message) => {
  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandInput = args.shift().toLowerCase();
    const actionsList = await commandActions(message, args);
    const action = actionsList.find(({ command }) => commandInput === command);

    action ? action.action() : null;
  } catch (error) {
    handleError(error);
  }
});

bot.login(discordBotToken);
