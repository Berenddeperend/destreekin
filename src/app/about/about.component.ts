import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { uniq, flattenDeep } from 'lodash';

@Component({
  selector: 'about',
  templateUrl: `./about.component.html`,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  products;
  sellers;
  sellerNames;
  inventory = {};
  types;
  typesInventory = {};

  constructor(
      private http: HttpClient,
  ) {}

  ngOnInit() {

    this.http.get('assets/data/sellers.json').subscribe(data => {
      console.log(data);
      this.sellers = data;

      let products = [];
      let sellerNames = [];
      let types = [];

      for(let seller of this.sellers) {
        products.push(seller.products);
        sellerNames.push(seller.name);
        types.push(seller.type);
      }

      let allProducts = flattenDeep(products).sort();

      this.products = uniq(flattenDeep(products)).sort();
      this.sellerNames = uniq(flattenDeep(sellerNames)).sort();
      this.types = uniq(types).sort();


      for(let product of allProducts) {
        if (!this.inventory[product]) {
          this.inventory[product] = 1;
        } else {
          this.inventory[product] ++;
        }
      }


      for(let sellerType of types) {
        if (!this.typesInventory[sellerType]) {
          this.typesInventory[sellerType] = 1;
        } else {
          this.typesInventory[sellerType] ++;
        }
      }
    });
  }
}
