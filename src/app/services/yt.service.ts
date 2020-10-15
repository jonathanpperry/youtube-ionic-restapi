import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class YtService {
  apiKey = "AIzaSyCsvPAI2HS3czIQ92hLN7vxUY3Fe3uSBg0";
  constructor(public http: HttpClient) {}

  getPlaylistsForChannel(channel) {
    return this.http
      .get(
        "https://www.googleapis.com/youtube/v3/playlists?key=" +
          this.apiKey +
          "&channelId=" +
          channel +
          "&part=snippet,id&maxResults=20"
      )
      .pipe(map((res) => res));
  }

  getListVideos(listId) {
    return this.http
      .get(
        "https://www.googleapis.com/youtube/v3/playlistItems?key=" +
          this.apiKey +
          "&playlistId=" +
          listId +
          "&part=snippet,id&maxResults=20"
      )
      .pipe(
        map((res) => {
          // return res.json()["items"];
        })
      );
  }
}
