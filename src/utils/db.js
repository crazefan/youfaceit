import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

const defaultDb = { nicknames: [], history: [] };

db.defaults(defaultDb).write();

export const duplicateCheck = (nickname) => db.get("nicknames").find(nickname).value(); //always returns undefined ??

export const addUser = (nickname) => {
  db.get("nicknames").push(nickname).write();
};

export const removeUser = (nickname) => {
  db.get("nicknames").pull(nickname).write();
};

export const showAddedUsers = () => {
  return db.get("nicknames").value();
};
