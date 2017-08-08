//angular cores
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//angular google maps
import { AgmCoreModule } from '@agm/core';

//firebase
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { environment } from '../environments/environment';

//material design
import { MdButtonModule } from "@angular/material";
import { MdSidenavModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

//routing
import { routing } from './app.routing';

//custom components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SellerDetailComponent } from './seller-detail/seller-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SellerDetailComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdSidenavModule,
    MdDialogModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5n-8onwJ_v6dNrT912P7XS_Eq0AbXVqg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SellerDetailComponent]

})
export class AppModule { }
