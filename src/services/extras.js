function getInfoMap(url) {
  console.log("url", url);
  function detectMapType(url) {
    const googleRegex = /(https?:\/\/(www\.)?google\.com\/maps)/;
    const osmRegex = /(https?:\/\/(www\.)?openstreetmap\.org)/;

    if (googleRegex.test(url)) {
      return "google_map";
    } else if (osmRegex.test(url)) {
      return "street_map";
    } else {
      return "unknown";
    }
  }

  const regex =
    detectMapType(url) === "google_map"
      ? /([-]?\d+[.]?\d*),([-]?\d+[.]?\d*)/
      : /map=\d+\/(-?\d+\.\d+)\/(-?\d+\.\d+)/;
  const match = url.match(regex);
  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[2]),
    };
  } else {
    return null;
  }
}
export { getInfoMap };
