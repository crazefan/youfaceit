import { playerIdList } from "../config.js";

export const getRelevantPlayers = (playerIdList, matchData) => {
  matchData.rounds[0].teams
    .reduce((result, team) => [...result, ...team.players], [])
    .filter((player) => playerIdList.includes(player.player_id));
};

export const getAllStats = (matchData) => {
  let scores = matchData.rounds[0].teams.map((team) =>
    team.players.map((player) => parseInt(player.player_stats.Kills))
  );
  return scores;
};

// export const getHighestScoredPlayer = (matchData) => {
//   getAllStats.map((value, index) => {

//   }
// }

export const getNickNamesArrays = (matchData) =>
  matchData.rounds[0].teams.map((team) => team.players.map((player) => player.nickname));

export const getTeamIndex = (matchData, playerIdList) => {
  const teamsArray = getNickNamesArrays(matchData);
  return teamsArray[0].some((nick) => playerIdList.includes(nick)) ? 0 : 1;
};

export const hasWon = (matchData, playerIdList) => {
  return (
    matchData.rounds[0].teams[getTeamIndex(matchData, playerIdList)].team_stats.team_win === "1"
  );
};

export const getOnlyYourPlayers = (matchData, playerIdList) => {
  getNickNamesArrays(matchData)[getTeamIndex(matchData, playerIdList)];
};

export const getYourTeamTable = (matchData, playerIdList) => {
  const ind = getTeamIndex(matchData, playerIdList);
  var namesColumns = getNickNamesArrays(matchData)[ind];
  var statsRows = getAllStats(matchData)[ind];
  var resultArr = [];
  statsRows.map((obj, index) => {
    resultArr.push(namesColumns[index] + " : " + obj);
  });
  return resultArr;
};

export const getBestPlayer = (matchData, playerIdList) => {};

// game summary including score table and best + worst players
export const summary = () => {};
