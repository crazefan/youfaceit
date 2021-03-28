export const isWithinLastFiveMinutes = (timestamp) => new Date().getTime() - timestamp <= 5 * 60000;

export const getCurrentDateTimeString = () => new Date().toLocaleString();
