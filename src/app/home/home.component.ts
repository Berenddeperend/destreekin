import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit {
  viewLat: number = 51.678418;
  viewLng: number = 7.809007;
  zoom = 12;

  markers = [
    {
      name: "Adolf",
      description: "Boer Klaas is een boer die hier ergens woont en toffe dingen doet. Hier staat een omschrijving van deze gast.",
      products: ['Kaas', 'Aardappelen'],
      address: "Haaksbergerstraat 174 Enschede",
      contact: "0612345678",
      lat: 51.678418,
      lng: 7.809007
    },
    {
      name: "Bdolf",
      lat: 53.678418,
      lng: 2.809007
    },
    {
      name: "Cdolf",
      lat: 55.678418,
      lng: 4.809007
    }
  ];

  ngOnInit() {
    this.setCurrentPosition();
  }

  testFunction(){
    console.log('this is a test function');
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
