import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SellerDetailComponent } from "./seller-detail/seller-detail.component";

export const appRoutes: Routes = [

  //order of routes is important!
  { path: 'home',
    component: HomeComponent,
    redirectTo: '',
  },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }, //nothing, or home
  { path: '**', component: HomeComponent}, // or 404
];


export const routing = RouterModule.forRoot(appRoutes);
