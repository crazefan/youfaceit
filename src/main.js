import Discord from "discord.js";
import { discordBotToken } from "./config";
const bot = new Discord.Client();
const prefix = "!";

bot.once("ready", () => {
  console.log("Bot is online");
});

fetch("https://aws.random.cat/meow").then((response) => response.json());

bot.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "cat") {
    const { file } = await fetch("https://aws.random.cat/meow").then((response) => response.json());

    message.channel.send(file);
  }
});

//should be last in the file
bot.login(`${discordBotToken}`);
