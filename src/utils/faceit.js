import { fetchPlayerData } from "../api/index.js";
import { getAddedUsers } from "./db.js";

export const getPlayerIdFromNickname = async (nickname) => {
  try {
    const playerData = await fetchPlayerData(nickname);
    return playerData.player_id;
  } catch (err) {
    return null;
  }
};

export const getAddedUsersNicknames = () => {
  return getAddedUsers().map((player) => player.nickname);
};

export const getAddedUsersIds = () => {
  return getAddedUsers().map((player) => player.userId);
};

export const getLatestCommonGame = (histories) => {
  const latestGames = histories.map((history) => history.items[0] || null);

  const gamesMap = latestGames.reduce(
    (result, game) =>
      game
        ? {
            ...result,
            [game.match_id]: result[game.match_id] ? result[game.match_id] + 1 : 1,
          }
        : result,
    {}
  );

  const gameId = Object.keys(gamesMap).reduce((result, matchId) =>
    gamesMap[matchId] > gamesMap[result] ? matchId : result
  );

  const latestGame = latestGames.find((game) => game.match_id === gameId);

  return latestGame && gamesMap[gameId] >= 2 ? latestGame : null;
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
  if (player1.kills > player2.kills) {
    return -1;
  }
  if (player1.kills < player2.kills) {
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
    player.player_stats.Kills < leastPerfomedPlayer.player_stats.Kills
      ? player
      : leastPerfomedPlayer
  );

export const getBestPerformedPlayer = (matchData, playerIdList) =>
  (getRelevantPlayers(matchData, playerIdList) || []).reduce((leastPerfomedPlayer, player) =>
    player.player_stats.Kills > leastPerfomedPlayer.player_stats.Kills
      ? player
      : leastPerfomedPlayer
  );
