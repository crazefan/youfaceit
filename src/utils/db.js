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

// addUser("tycelent", "asdasdasd");
// import lowdb from "lowdb";
// import FileSync from "lowdb/adapters/FileSync.js";

// const adapter = new FileSync("db.json");
// const db = lowdb(adapter);

// const defaultDb = { nicknames: [], history: [] };

// db.defaults(defaultDb).write();

// export const duplicateCheck = (nickname) =>
//   db
//     .get("nicknames")
//     .find({ nickname: `${nickname}` })
//     .value();

// export const addUser = (nickname, userId) => {
//   db.get("nicknames")
//     .push({ nickname: `${nickname}`, userId: `${userId}` })
//     .write();
// };

// export const removeUser = (nickname) => {
//   db.get("nicknames")
//     .remove({ nickname: `${nickname}` })
//     .write();
// };

// export const getAddedUsers = () => {
//   return db.get("nicknames").value();
// };

// export const saveGame = (gameId) => {
//   db.get("history").push({ id: gameId }).write();
// };

// export const getGame = (gameId) => {
//   return db.get("history").find({ id: gameId }).value();
// };
