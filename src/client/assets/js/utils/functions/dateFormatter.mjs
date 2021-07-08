/**
 * Creates the output of the time period from received duration in minutes.
 *
 * @param {Date|string|number} date - Date or string convertible to date or timestamp.
 * @returns {string|null} - Representation of date in format: [short day name] [leading zero day number], hh:mm.
 * null for invalid dates.
 */
export function formatDateOutput(date) {
  if (!date && date !== 0) {
    return null;
  }

  const buildDate = new Date(date);
  if (!(buildDate instanceof Date) || isNaN(+buildDate)) {
    return null;
  }

  const dateStringParts = buildDate.toUTCString().split(' ');

  return `${dateStringParts[2]} ${dateStringParts[1]}, ${dateStringParts[4].substring(0, 5)}`;
}

/**
 * Creates the output of the time period from received duration in minutes.
 *
 * @param {number} duration - Time period represented as a number of minutes.
 * @returns {string} - Representation of time period in format: HH h MM min.
 * If any of the hours or minutes is 0 it will be omitted.
 */
export function formatDurationOutput(duration) {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;

  return `${hours ? `${hours} h` : ''} ${minutes ? `${minutes} min` : ''}`.trim();
}
