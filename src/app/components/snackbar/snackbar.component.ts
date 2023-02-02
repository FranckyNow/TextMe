import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface snackData {
  text: string,
  icon: string
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: snackData, private _snackRef: MatSnackBarRef<SnackbarComponent>,
  private ren: Renderer2) {
    setTimeout(()=>{
      let snackEl = document.getElementsByClassName('mat-snack-bar-container').item(0);
      ren.listen(snackEl, 'click', ()=>this.dismiss())
    })
  }

  ngOnInit(): void {
  }
  
  dismiss(){
    this._snackRef.dismiss();
  }

}
