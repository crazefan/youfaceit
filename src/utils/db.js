import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

const defaultDb = { nicknames: [], history: [] };

db.defaults(defaultDb);

export const addUser = (nickname) => {
  db.get("nicknames").push(nickname).write();
};

export const removeUser = (nickname) => {
  db.get("nicknames").remove(nickname).write();
};

export const showAddedUsers = () => {
  db.get("nicknames").value();
};
