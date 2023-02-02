import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackBar(message: string, icon: string, duration: number) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: {
        text: message,
        icon: icon
      },
      duration: duration,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['snackbar']
    });
  }
}
