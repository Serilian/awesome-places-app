import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/place";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  currentPlace: Place;

  constructor(public navParams: NavParams, private viewCrtl: ViewController) {
    this.currentPlace = this.navParams.get('place');
  }

  ionViewWillEnter() {

  }

  onLeave() {
    this.viewCrtl.dismiss();
  }


  onDelete() {

    this.onLeave();
  }

}
