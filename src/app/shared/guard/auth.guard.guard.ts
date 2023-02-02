import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "src/app/shared/services/auth.service";
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    public authService: AuthService,
    public router: Router,
    public sharedService: SharedService
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.authService.isLoggedIn);
      
    if(this.authService.isLoggedIn !== true) {
      if(this.router.url == '/') {
        this.sharedService.openSnackBar("Vous avez besoin d'un compte pour continuer", "cancel", 2500);
      }
      this.router.navigate(['sign-in'])
    }
    return true;
  }
}