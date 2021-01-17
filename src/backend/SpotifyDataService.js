import Track from "./Track"
class SpotifyDataService {
    static parseSearchResponse(response) {
        let obj = JSON.parse(response);
        return obj.tracks.items
    }
    static searchResponseObjToTrackList(responseObj){
        return responseObj.map((trackObj) => {
            return this.parseTracksIntoTrackobject(trackObj);
        });
    }
    static parseTracksIntoTrackobject(track){
        let title = track.name;
        let artist = track.artists[0].name;
        let releaseDate = track.album.release_date
        let albumTitle = track.album.name
        let albumCover = track.album.images[0].url;

        return new Track(title, artist, releaseDate, albumTitle,albumCover)
    }
    static tracksListtoNamesList(tracks) {
        return tracks.map((track) => { return track.name});
    }

    static getNamesFromResponse(response) {
        let items = this.parseSearchResponse(response);
        let tracks = this.searchResponseObjToTrackList(items);
        return this.tracksListtoNamesList(tracks);
        }
    
    static getTrackListfromResponse(response) {
        let trackList = this.parseSearchResponse(response);
        return this.searchResponseObjToTrackList(trackList);
    }
}
export default SpotifyDataService;