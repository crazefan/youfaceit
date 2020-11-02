export const getAllStats = (matchData) => {
  let scores = matchData.rounds[0].teams.map((team) =>
    team.players.map((player) => parseInt(player.player_stats.Kills))
  );
  //return only our team stats
  console.log(scores);
  return scores;
};

export const getTeamIndex = (matchData, playerIdList) => {
  const nicknames = matchData.rounds[0].teams.map((team) =>
    team.players.map((player) => player.nickname)
  );
  return nicknames[0].some((nick) => playerIdList.includes(nick)) ? 0 : 1;
};

export const hasWon = (matchData) => {
  const team = matchData.rounds[0].teams.find((team) => playerIds.includes(team.team_id));

  return team.team_stats["Team Win"] === "1";
};
