/**
 * Performs a fetch request to the specified URL with the given options.
 *
 * @async
 * @function
 * @param {string} url - The URL to send the request to.
 * @param {RequestInit} [options={}] - Optional fetch options such as method, headers, body, etc.
 * @returns {Promise<Response>} The fetch API Response object.
 */
export async function baseQuery(url, options = {}) {
  const response = await fetch(url, options);
  return response;
}
