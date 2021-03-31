export const getRelevantPlayers = (matchData, playerIdList) => {
  return matchData.rounds[0].teams
    .reduce((result, team) => [...result, ...team.players], [])
    .filter((player) => playerIdList.includes(player.nickname));
};

export const getAllStats = (matchData) => {
  return matchData.rounds[0].teams.map((team) =>
    team.players.map((player) => parseInt(player.player_stats.Kills))
  );
};

export const getNickNamesArrays = (matchData) => {
  return matchData.rounds[0].teams.map((team) => team.players.map((player) => player.nickname));
};

export const getTeamIndex = (matchData, playerIdList) => {
  return getNickNamesArrays(matchData)[0].some((nick) => playerIdList.includes(nick)) ? 0 : 1;
};

export const hasWon = (matchData, playerIdList) => {
  return (
    matchData.rounds[0].teams[getTeamIndex(matchData, playerIdList)].team_stats["Team Win"] === "1"
  );
};

export const getOnlyYourPlayers = (matchData, playerIdList) => {
  return getNickNamesArrays(matchData)[getTeamIndex(matchData, playerIdList)];
};

export const getTeamScoreboard = (matchData, playerIdList) => {
  const teamIndex = getTeamIndex(matchData, playerIdList);
  const namesColumns = getNickNamesArrays(matchData)[teamIndex];
  const statsRows = getAllStats(matchData)[teamIndex];
  return statsRows.map((object, index) => namesColumns[index] + " : " + object).join("\n");
};

export const getLeastPerformedPlayer = (matchData, playerIdList) =>
  getRelevantPlayers(matchData, playerIdList).reduce((leastPerfomedPlayer, player) =>
    player.player_stats.Kills < leastPerfomedPlayer.player_stats.Kills
      ? player
      : leastPerfomedPlayer
  );

export const getBestPerformedPlayer = (matchData, playerIdList) =>
  getRelevantPlayers(matchData, playerIdList).reduce((leastPerfomedPlayer, player) =>
    player.player_stats.Kills > leastPerfomedPlayer.player_stats.Kills
      ? player
      : leastPerfomedPlayer
  );