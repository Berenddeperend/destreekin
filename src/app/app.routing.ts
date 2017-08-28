import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, redirectTo: ''},
  { path: 'about', component: AboutComponent },
  { path: '**', component: HomeComponent},
];


export const routing = RouterModule.forRoot(appRoutes);




//
// { path: '', redirectTo: 'home', pathMatch: 'full' },
// { path: 'home', component: HomeComponent },
// { path: 'about', component: AboutComponent }