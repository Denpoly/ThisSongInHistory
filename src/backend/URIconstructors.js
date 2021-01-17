export function constructSpotifySearchQuery(name) {
    return "?q=" + encodeURI(name) + "&type=track";
}