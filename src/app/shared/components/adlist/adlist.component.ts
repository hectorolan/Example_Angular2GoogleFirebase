import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material/snack-bar';
import { MdDialog, MdDialogRef } from '@angular/material/dialog';
import { Ad } from '../../../models/ad';
import { Section } from '../../../models/section';
import { Console } from '../../../models/console';
import { IgdbService } from '../../../services/igdb.service';
import { AuthService } from '../../../services/auth.service';
import { AdService } from '../../../services/ad.service';
import { YesCancelDialogComponent } from '../../dialogs/yes-cancel-dialog/yes-cancel-dialog.component';

@Component({
  selector: 'app-adlist',
  templateUrl: './adlist.component.html',
  styleUrls: ['./adlist.component.css']
})
export class AdlistComponent implements OnInit {
  sections = Section.Sections;
  consoles = Console.Consoles;
  dialogRef: MdDialogRef<YesCancelDialogComponent>;

  @Input()
  ads: Ad[];

  constructor(
    private igdbService: IgdbService,
    private authService: AuthService,
    private adService: AdService,
    private snackBar: MdSnackBar,
    private dialog: MdDialog) { }

  ngOnInit() {
  }

  deleteAd(ad: Ad) {
    this.dialogRef = this.dialog.open(YesCancelDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.message = "Are you sure you want to delete your ad?";
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (result['response'] == true) {
        this.adService.deleteAd(ad.id, this.authService.user).then(() => {
          let snackRef = this.snackBar.open('Ad deleted');
          setTimeout(() => { snackRef.dismiss(); }, 2000);
          location.reload();
        });
      }
    });

    
  }

  getImageSrc(imageKey: string): string {
    if (imageKey.indexOf('image') >= 0) {
      return imageKey;
    }
    return this.igdbService.getGameURL(imageKey);
  }

}
