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
  channelId = "UCZZPgUIorPao48a1tBYSDgg";
  playlists = [];
  playlistObservable;
  constructor(
    private alertController: AlertController,
    public navCtrl: NavController,
    private ytService: YtService
  ) {}

  searchPlaylist() {
    this.playlistObservable = this.ytService.getPlaylistsForChannel(
      this.channelId
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
