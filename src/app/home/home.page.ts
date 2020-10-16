import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Observable } from "rxjs";
import { YtService } from "../services/yt.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  playlists = [];
  playlistObservable;

  // Array of pre-defined channels
  youtubeChannels = [
    {
      name: "Simon Grimm Ionic",
      channelId: "UCZZPgUIorPao48a1tBYSDgg",
    },
    {
      name: "Half In Japan",
      channelId: "UCCzIeqCybFGF_ykW6agM45A",
    },
  ];

  selectedChannel;
  constructor(
    private alertController: AlertController,
    public navCtrl: NavController,
    private ytService: YtService
  ) {}

  searchPlaylist() {
    this.playlistObservable = this.ytService.getPlaylistsForChannel(
      this.selectedChannel.channelId
    );
    this.playlistObservable.subscribe(
      (data) => {
        this.playlists = data["items"];
      },
      (err) => {
        console.error("Error: ", err);
      }
    );
  }

  openPlaylist(id) {
    this.navCtrl.navigateForward("playlist", { queryParams: { id: id } });
  }
}
