import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MarionnettePage } from '../marionnette/marionnette';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 8; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(MarionnettePage, {
      item: item
    });
  }

}
