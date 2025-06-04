import { TZDate } from "react-day-picker";

/**
 * Formats a given Date object into a string with day, month, year, and optional GMT offset.
 *
 * @param {Date} date - The date to format.
 * @param {string} timeZone - The IANA time zone name (e.g., "America/New_York").
 * @param {boolean} [showGmt=true] - Whether to append the GMT offset to the formatted date.
 * @returns {string} The formatted date string, optionally including the GMT offset.
 */
export const formatDay = (date, timeZone, showGmt = true) => {
  const options = { day: "2-digit", month: "short", year: "numeric", timeZone };
  const formattedDate = date.toLocaleString("en-US", options).replace(/,/g, "");
  if (!showGmt) return formattedDate;
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const absOffset = String(Math.abs(offset / 60)).padStart(2, "0");
  return `${formattedDate} GMT${sign}${absOffset}`;
};

/**
 * Converts an object of date strings to an object with dates formatted in a specific time zone.
 *
 * @param {Object} dates - An object where keys are date strings and values are associated data.
 * @param {string} timeZone - The IANA time zone identifier (e.g., "America/New_York").
 * @returns {Object} An object with keys as formatted date strings (YYYY-MM-DD) in the specified time zone and values as the original associated data.
 */
export const convertToTzDates = (dates, timeZone) => {
  const result = {};
  Object.entries(dates).forEach(([key, value]) => {
    // Parse the date string to a Date object
    const dateObj = new TZDate(new Date(key), timeZone);
    // Format as YYYY-MM-DD in the given timeZone
    const formatted = dateObj.toLocaleDateString("en-US", { timeZone });
    result[formatted] = value;
  });
  return result;
};

/**
 * An array of objects representing selectable day counts in increments of 5, up to 30.
 * Each object contains a `label` (string) and a `value` (number).
 *
 * Example:
 * [
 *   { label: "5", value: 5 },
 *   { label: "10", value: 10 },
 *   ...
 *   { label: "30", value: 30 }
 * ]
 *
 * @type {{ label: string, value: number }[]}
 */
export const maxDaysList = Array.from({ length: 6 }, (_, i) => {
  const num = (i + 1) * 5;
  return { label: String(num), value: num };
});

/**
 * Converts an epoch date (in seconds) to a localized date string in the specified time zone.
 *
 * @param {number} epochDate - The epoch date in seconds.
 * @param {string} timeZone - The IANA time zone identifier (e.g., "America/New_York").
 * @returns {string} The formatted local date string (e.g., "Jan 01, 2024").
 */
export const epochDateToLocal = (epochDate, timeZone) => {
  const timestampMs = Number(epochDate) * 1000; // seconds to ms
  const dateInTZ = new TZDate(timestampMs, timeZone);
  return dateInTZ.toLocaleString("en-US", {
    timeZone,
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

/**
 * Converts a JavaScript Date object to epoch time in seconds.
 *
 * @param {Date} date - The date to convert.
 * @returns {number} The epoch time in seconds.
 */
export const convertToEpochTime = (date) => {
  const epochMs = date.getTime();
  const epochSeconds = Math.floor(epochMs / 1000);
  return epochSeconds;
};
