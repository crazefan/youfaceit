import dotenv from "dotenv";

dotenv.config();

export const faceitApiKey = process.env.FACEIT_API_KEY;

export const discordBotToken = process.env.DISCORD_BOT_TOKEN;

export const faceitApiBaseUrl = process.env.FACEIT_API_BASE_URL;

export const playerIdList = process.env.PLAYER_ID_LIST.split(",").map((id) => id.trim());
