function toFixed(n, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

function floor(n, decimals) {
  return Math.floor(toFixed(n, decimals));
}

module.exports = {
  toFixed,
  floor,
};
