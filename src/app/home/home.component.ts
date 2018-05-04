import { Component, OnInit, NgZone } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SellerDetailComponent } from "../seller-detail/seller-detail.component";
import { HttpClient } from "@angular/common/http";
// import { LatLngBounds, LatLngBoundsLiteral, MapTypeStyle } from '../services/google-maps-types';
import { LatLngBounds, LatLngBoundsLiteral } from '@agm/core/map-types';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { uniq, flattenDeep } from 'lodash';
import GoogleMapsLoader from 'google-maps';


@Component({
  selector: 'home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  map;
  viewLat: number = 52.239338;
  viewLng: number = 6.828003;
  zoom = 9;

  

  sellers;
  categories;
  mapsStyling;
  markerImg = "assets/img/marker.png";

  constructor(
      public dialog: MdDialog,
      private http: HttpClient,
      private router: Router,
      private location: Location,
      private zone: NgZone
  ) {}

  ngOnInit() {

    // çGoogleMapsLoader 
    GoogleMapsLoader.KEY = 'AIzaSyC5n-8onwJ_v6dNrT912P7XS_Eq0AbXVqg';
    GoogleMapsLoader.load((google) => {

      this.map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 4,
        disableDefaultUI: true,
        styles: [
          {
            "featureType": "landscape",
            "stylers": [
              {
                "hue": "#FFA800"
              },
              {
                "saturation": 0
              },
              {
                "lightness": 0
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.highway",
            "stylers": [
              {
                "hue": "#53FF00"
              },
              {
                "saturation": -73
              },
              {
                "lightness": 40
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "stylers": [
              {
                "hue": "#FBFF00"
              },
              {
                "saturation": 0
              },
              {
                "lightness": 0
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "road.local",
            "stylers": [
              {
                "hue": "#00FFFD"
              },
              {
                "saturation": 0
              },
              {
                "lightness": 30
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "water",
            "stylers": [
              {
                "hue": "#00BFFF"
              },
              {
                "saturation": 6
              },
              {
                "lightness": 8
              },
              {
                "gamma": 1
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "hue": "#679714"
              },
              {
                "saturation": 33.4
              },
              {
                "lightness": -25.4
              },
              {
                "gamma": 1
              }
            ]
          }
        ],
      });

      this.http.get('assets/data/maps-styling.json').subscribe( data => {
        this.mapsStyling = data;
      });
  
      this.http.get('assets/data/sellers.json').subscribe(data => {
        this.sellers = data;
        // this.fitBounds;
        let products = [];
        for(let seller of this.sellers) {
          products.push(seller.products);
        }
        let uniqueProducts = uniq(flattenDeep(products));
  
        this.sellers.map(seller => {
          let marker = new google.maps.Marker({
            position: {lat: seller.lat, lng: seller.lng},
            map: this.map
          });
          
          marker.addListener('click', () => {
            this.openDialog(seller);
          })
        });

        let bounds:LatLngBounds = new google.maps.LatLngBounds();
    
        for(let seller of this.sellers){
          bounds.extend(new google.maps.LatLng(seller.lat, seller.lng));
        }

        this.map.fitBounds(bounds)

      });
    });
    

    // let mapsClient = new google.createClient();
    // console.log('mapsClient: ', mapsClient);

    // this.findStoresBounds()
    // this.setCurrentPosition(); 


  }

  getMarkerIcon(marker) {
    return 'assets/img/' + marker.type.toLowerCase() + '.svg';
  }

  openDialog(marker) {
    console.log('opendialog');
    console.log(marker);

    let spacesToDashes = function(string) {
      return string.split(' ').join('-').toLowerCase();
    };

    this.location.go('/verkoper', spacesToDashes(marker.name));

    this.zone.run(()=> {
      let dialogRef = this.dialog.open(SellerDetailComponent, {
        data: marker,
        panelClass: 'berend'
      });
    })
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

  // public storeMapReady(map){
  //     this.map = map;
  //     this.map.fitBounds(this.findStoresBounds());
  // }

  // public findStoresBounds(){
  //     let bounds:LatLngBounds = new google.maps.LatLngBounds();
      
  //     console.log(bounds)


  //     for(let seller of this.sellers){
  //       bounds.extend(new google.maps.LatLng(seller.latitude, seller.longitude));
  //     }
  //     return bounds;
  // }
}