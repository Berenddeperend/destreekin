import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SellerDetailComponent } from "../seller-detail/seller-detail.component";
import { HttpClient } from "@angular/common/http";
// import { LatLngBounds, LatLngBoundsLiteral, MapTypeStyle } from '../services/google-maps-types';
import { LatLngBounds, LatLngBoundsLiteral } from '@agm/core/map-types';
import { Router } from "@angular/router";
import { Location } from '@angular/common';


@Component({
  selector: 'home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit {
  viewLat: number = 52.239338;
  viewLng: number = 6.828003;
  zoom = 9;
  //
  // fitBounds = {
  //   east: 5.311666,
  //   north: 4.92019,
  //   south: 5.7617269,
  //   west: 8.43541
  // };

  sellers;
  categories;
  mapsStyling;

  constructor(
      public dialog: MdDialog,
      private http: HttpClient,
      private router: Router,
      private location: Location
  ) {
  }

  ngOnInit() {
    // this.setCurrentPosition();

    console.log('ngoninit of HomeComponent');

      this.http.get('assets/data/sellers.json').subscribe(data => {
        this.sellers = data;

        // this.fitBounds;

        for(let seller of this.sellers.sellers) {
          // console.log(seller['lat']);
        }

        // console.log(this.sellers.sellers);
    });


    this.categories = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'}
    ];


    this.http.get('assets/data/maps-styling.json').subscribe( data => {
      this.mapsStyling = data;



      //below is stuff that i should use for the sellers.
      // let mapStyling = data;
      // console.log(mapStyling);
	  //
      // for(let stylingItem in mapStyling) {
      //   console.log(mapStyling[stylingItem].featureType);
      // }

    });
  }


  openDialog(marker) {

    let spacesToDashes = function(string) {
      return string.split(' ').join('-').toLowerCase();
    };

    this.location.go('/verkoper', spacesToDashes(marker.name));

    let dialogRef = this.dialog.open(SellerDetailComponent, {
        data: marker,
        panelClass: 'berend'
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {

      console.log('setting current position...');

      navigator.geolocation.getCurrentPosition((position) => {
        console.log('...done');

        this.viewLat = position.coords.latitude;
        this.viewLng = position.coords.longitude;
        this.zoom = 5;
      });
    }
  }

}
