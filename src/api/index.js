import axios from "axios";
import { faceitApiKey } from "../config.js";

export const fetchMatchData = (matchId) => {
  return axios
    .get(`https://open.faceit.com/data/v4/matches/${matchId}/stats`, {
      headers: {
        Authorization: "Bearer " + faceitApiKey,
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      Promise.reject(err);
    });
};

export const fetchPlayerData = (nickname) => {
  return axios
    .get(`https://open.faceit.com/data/v4/players?nickname=${nickname}`, {
      headers: {
        Authorization: "Bearer " + faceitApiKey,
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      Promise.reject(err);
    });
};

// const faceitApi = axios.create({
//   headers: {
//     Authorization: "Bearer " + faceitApiKey,
//   },
//   baseURL: "https://open.faceit.com/data/v4/",
// });

// faceitApi.interceptors.response.use(
//   (response) => response.data,
//   (error) => Promise.reject(error)
// );

// export const fetchMatchData = (matchId) => faceitApi.get(`matches/${matchId}/stats`);
