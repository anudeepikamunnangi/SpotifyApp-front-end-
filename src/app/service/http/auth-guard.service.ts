import { Injectable, inject } from '@angular/core';
import {  CanActivateFn,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {
  canActivate(arg0: any, arg1: any) {
    throw new Error('Method not implemented.');
  } 

}

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};


export const LoginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (token===null) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
