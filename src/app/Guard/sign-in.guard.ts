import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Valida si un usuario ha iniciado sesión
 */
export class SignInGuard implements CanActivate {
  constructor(private router: Router) {

  }


  /**
   * Si es verdadero procederá con la ruta de lo contrario lo redirige a la ruta /
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let temp = localStorage.getItem(environment.Storage.AddresCrypt);
    if (!(temp == null || temp == undefined)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
