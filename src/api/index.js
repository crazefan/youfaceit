import axios from "axios";

const faceitApi = axios.create({
  baseURL: "https://open.faceit.com/data/v4/",
});
