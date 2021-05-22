import mongoose from "mongoose";

import { mongoDbUri } from "../config.js";

mongoose
  .connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));

const { Schema } = mongoose;

const ServerSchema = new Schema({
  guildId: String,
  language: String,
});

const ServerConfig = mongoose.model("ServerConfig", ServerSchema);

const PlayerSchema = new Schema({
  nickname: String,
  userId: String,
  guildId: String,
});

const Player = mongoose.model("PlayerTest", PlayerSchema);

export const duplicateCheck = async (nickname, guildId) => {
  return await Player.exists({ nickname: nickname, guildId: guildId });
};

export const getAddedUsers = async (guildId) => {
  return await Player.find({ guildId: guildId });
};

export const addUser = async (nickname, userId, guildId) => {
  const player = new Player({
    nickname: nickname,
    userId: userId,
    guildId: guildId,
  });
  await player.save();
};

export const removeUser = async (nickname, guildId) => {
  await Player.deleteOne({ nickname: nickname, guildId: guildId });
};

export const getAddedUsersNicknames = async (guildId) => {
  const list = await Player.find({ guildId: guildId });
  return list.map((player) => player.nickname);
};

export const getAddedUsersIds = async (guildId) => {
  const list = await Player.find({ guildId: guildId });
  return list.map((player) => player.userId);
};

export const addServerConfig = async (guildId, language) => {
  const serverConfig = new ServerConfig({
    guildId: guildId,
    language: language,
  });

  await serverConfig.save();
};

export const getServerLanguage = async (guildId) => {
  const server = await ServerConfig.findOne({ guildId: guildId });
  //if server config is not in db yet then add it to collection and set english as default
  if (!server) {
    await addServerConfig(guildId, "en");
    return "en";
  }
  return server.language;
};

export const setServerLanguage = async (guildId, language) => {
  await ServerConfig.updateOne({ guildId: guildId }, { language: language });
  return getServerLanguage(guildId);
};
