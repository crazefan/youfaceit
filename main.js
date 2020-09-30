const Discort = require("discord.js");

const client = new Discort.Client();

const prefix = "!";

client.once("ready", () => {
  console.log("Bot is online");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.channel.send("pong!");
  }
});

//should be last in the file
client.login("NzYwNTQ5MDQ4NDc3Mjg2NDIw.X3Nqfw.Z5yOK97NIf73hoccO8cCH_K7fbk");
