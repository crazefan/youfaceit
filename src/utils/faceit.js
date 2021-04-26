import { fetchPlayerData } from "../api/index.js";

export const getPlayerIdFromNickname = async (nickname) => {
  try {
    const playerData = await fetchPlayerData(nickname);
    return playerData.player_id;
  } catch (err) {
    return null;
  }
};

export const getLatestCommonGame = (histories) => {
  const latestGames = histories.map((history) => history.items[0] || null);

  const gamesMap = latestGames.reduce(
    (result, game) =>
      game
        ? {
            ...result,
            [game.match_id]: {
              commonGames: result[game.match_id] ? result[game.match_id].commonGames + 1 : 1,
              timeFinished: game.finished_at,
            },
          }
        : result,
    {}
  );

  // using gamesMap find a game with at least 2 players from server and then returning game id of the latest of them
  const latestGameId = Object.keys(gamesMap)
    .filter((game) => gamesMap[game].commonGames >= 2)
    .reduce((acc, curr) => (acc > gamesMap[curr].timeFinished ? prev : curr), 0);

  return latestGameId;
};

export const getRelevantPlayers = (matchData, playerIdList) => {
  return matchData.rounds[0].teams
    .reduce((result, team) => [...result, ...team.players], [])
    .filter((player) => playerIdList.includes(player.nickname));
};

export const getTeamIndex = (matchData, playerIdList) => {
  return matchData.rounds[0].teams[0].players
    .map((player) => player.nickname)
    .some((nick) => playerIdList.includes(nick))
    ? 0
    : 1;
};

export const hasWon = (matchData, playerIdList) => {
  return (
    matchData.rounds[0].teams[getTeamIndex(matchData, playerIdList)].team_stats["Team Win"] === "1"
  );
};

export const sortPlayersByKills = (player1, player2) => {
  if (compareInts(player1.kills, player2.kills)) {
    return -1;
  }
  if (!compareInts(player1.kills, player2.kills)) {
    return 1;
  }
  return 0;
};

export const getTeamScoreboard = (matchData, playerIdList) => {
  return matchData.rounds[0].teams[getTeamIndex(matchData, playerIdList)].players
    .map(({ nickname, player_stats }) => ({
      nickname,
      kills: player_stats.Kills,
    }))
    .sort(sortPlayersByKills)
    .map(({ nickname, kills }) => nickname + " : " + kills)
    .join("\n");
};

export const getLeastPerformedPlayer = (matchData, playerIdList) =>
  getRelevantPlayers(matchData, playerIdList).reduce((leastPerfomedPlayer, player) =>
    !compareInts(player.player_stats.Kills, leastPerfomedPlayer.player_stats.Kills)
      ? player
      : leastPerfomedPlayer
  );

export const getBestPerformedPlayer = (matchData, playerIdList) =>
  (getRelevantPlayers(matchData, playerIdList) || []).reduce((leastPerfomedPlayer, player) =>
    compareInts(player.player_stats.Kills, leastPerfomedPlayer.player_stats.Kills)
      ? player
      : leastPerfomedPlayer
  );

const compareInts = (object1, object2) => {
  return parseInt(object1) > parseInt(object2) ? true : false;
};
