/**
 *
 * @param {string for encode to b64} str
 */
export const b64Encode = str => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
};

/**
 *
 * @param {b64 for decode to string} str
 */
export const b64Decode = str => {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
};
