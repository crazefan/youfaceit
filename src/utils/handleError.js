import { getCurrentDateTimeString } from "./dateTime.js";

export const handleError = (error) => {
  console.log(`${getCurrentDateTimeString()} - error:`);
  console.log(error);
};
