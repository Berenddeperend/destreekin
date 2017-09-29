import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { uniq, flattenDeep } from 'lodash';

@Component({
  selector: 'about',
  templateUrl: `./about.component.html`,
})
export class AboutComponent implements OnInit {
  products;
  sellers;
  sellerNames;
  inventory = {};

  constructor(
      private http: HttpClient,
  ) {}

  ngOnInit() {

    this.http.get('assets/data/sellers.json').subscribe(data => {
      console.log(data);
      this.sellers = data;

      let products = [];
      let sellerNames = [];


      let snavel = {
        "kaas": 2,
        "groenten": 2
      };

      for(let seller of this.sellers.sellers) {
        products.push(seller.products);
        sellerNames.push(seller.name);
      }


      let allProducts = flattenDeep(products).sort();


      for(let product of allProducts) {
        if (!this.inventory[product]) {
          this.inventory[product] = 1;
        } else {
          this.inventory[product] ++;
        }
      }


      console.log('inventory');
      console.log(this.inventory);


      this.products = uniq(flattenDeep(products)).sort();
      this.sellerNames = uniq(flattenDeep(sellerNames)).sort();

    });

  }
}
