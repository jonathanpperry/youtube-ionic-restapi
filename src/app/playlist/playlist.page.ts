import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";
import { NavController, Platform } from "@ionic/angular";
import { YtService } from "../services/yt.service";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.page.html",
  styleUrls: ["./playlist.page.scss"],
})
export class PlaylistPage implements OnInit {
  videoObservable;
  videos;
  constructor(
    public navController: NavController,
    private platform: Platform,
    private route: ActivatedRoute,
    private youtube: YoutubeVideoPlayer,
    private ytService: YtService
  ) {
    this.route.queryParamMap.subscribe((map) => {
      let listId = map.get("id");
      console.log("the list id is: ", listId);
      this.videoObservable = this.ytService.getListVideos(listId);
      this.videoObservable.subscribe((data) => {
        console.log("video data: ", data);
        this.videos = data["items"];
      });
    });
  }

  openVideo(video) {
    if (this.platform.is("cordova")) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open(
        "https://www.youtube.com/watch?v=" + video.snippet.resourceId.videoId
      );
    }
  }

  ngOnInit() {}
}
