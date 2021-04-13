import { mongoDbUri } from "../config.js";

import mongoose from "mongoose";

await mongoose
  .connect(mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error));

const { Schema } = mongoose;

const PlayerSchema = new Schema({
  nickname: String,
  userId: String,
  guildId: String,
});

const Player = mongoose.model("PlayerTest", PlayerSchema);

export const duplicateCheck = async (nickname, guildId) => {
  return await Player.exists({ nickname: `${nickname}`, guildId: `${guildId}` });
};

export const getAddedUsers = async (guildId) => {
  return await Player.find({ guildId: `${guildId}` });
};

export const addUser = async (nickname, userId, guildId) => {
  const player = new Player({
    nickname: `${nickname}`,
    userId: `${userId}`,
    guildId: `${guildId}`,
  });
  await player.save();
};

export const removeUser = async (nickname, guildId) => {
  await Player.deleteOne({ nickname: `${nickname}`, guildId: `${guildId}` });
};

export const getAddedUsersNicknames = async (guildId) => {
  const list = await Player.find({ guildId: `${guildId}` });
  return list.map((player) => player.nickname);
};

export const getAddedUsersIds = async (guildId) => {
  const list = await Player.find({ guildId: `${guildId}` });
  return list.map((player) => player.userId);
};
