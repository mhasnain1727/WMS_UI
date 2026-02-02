import { Routes } from '@angular/router';
import { Login } from './login';
import { Signup } from './signup';

export default [
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
] as Routes;
