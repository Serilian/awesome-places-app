import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places.service";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  currentPlace: Place;
  index: number;

  constructor(public navParams: NavParams, private viewCrtl: ViewController,
              private pservice: PlacesService) {
    this.currentPlace = this.navParams.get('place');
    this.index = this.navParams.get('index')
  }

  ionViewWillEnter() {

  }

  onLeave() {
    this.viewCrtl.dismiss();
  }


  onDelete() {
    this.pservice.deletePlace(this.index);
    this.onLeave();
  }

}
