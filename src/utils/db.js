import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

const defaultDb = { nicknames: [], history: [] };

db.defaults(defaultDb).write();

export const duplicateCheck = (nickname) => db.get("nicknames").find(nickname).value();

export const addUser = (nickname, userId) => {
  db.get("nicknames")
    .push({ nickname: `${nickname}`, userId: `${userId}` })
    .write();
};

export const removeUser = (nickname) => {
  db.get("nicknames").pull(nickname).write();
};

export const getAddedUsers = () => {
  return db.get("nicknames").value();
};

export const saveGame = (gameId) => {
  db.get("history").push({ id: gameId }).write();
};

export const getGame = (gameId) => {
  return db.get("history").find({ id: gameId }).value();
};
