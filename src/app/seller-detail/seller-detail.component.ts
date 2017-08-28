import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";


@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.scss']
})
export class SellerDetailComponent implements OnInit, OnDestroy {

  constructor(
      @Inject(MD_DIALOG_DATA)
      public data: any,
      private router: Router
  ) { }

  ngOnInit() {
    console.log('initialized seller detail met deze data:');
    console.log(this.data);
  }

  ngOnDestroy(){
    this.router.navigate(['/',]);
  }
}