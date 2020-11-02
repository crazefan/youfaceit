import axios from "axios";
import { faceitApiKey } from "../config.js";

const faceitApi = axios.create({
  headers: {
    Authorization: "Bearer " + faceitApiKey,
  },
  baseURL: "https://open.faceit.com/data/v4/",
});

faceitApi.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const fetchMatchData = (matchId) => faceitApi.get(`matches/${matchId}/stats`);
