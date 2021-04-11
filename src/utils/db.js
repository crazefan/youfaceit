import { mongoDbUri } from "../config.js";

import mongoose from "mongoose";

await mongoose.connect(mongoDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { Schema } = mongoose;

const PlayerSchema = new Schema({
  nickname: String,
  userId: String,
});

const Player = mongoose.model("Player", PlayerSchema);

export const duplicateCheck = async (nickname) => {
  return await Player.exists({ nickname: `${nickname}` });
};

export const getAddedUsers = async () => {
  return await Player.find({});
};

export const addUser = async (nickname, userId) => {
  const player = new Player({
    nickname: `${nickname}`,
    userId: `${userId}`,
  });
  await player.save();
};

export const removeUser = async (nickname) => {
  await Player.deleteOne({ nickname: `${nickname}` });
};
