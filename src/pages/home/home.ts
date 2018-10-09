import {Component, OnInit} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {PlacesService} from "../../services/places.service";
import {Place} from "../../models/place";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  places: Place[];
  addPlacesPage = AddPlacePage;
  constructor(public mCtrl: ModalController, private pservice: PlacesService) {
  }

  ionViewWillEnter () {
    this.places = this.pservice.loadPlaces();
  }

  ngOnInit(): void {
    this.pservice.fetchPlaces().
    then((places: Place[])=> this.places = places);
  }



  onOpenPlace(place: Place, index:number) {
    const modal = this.mCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }


}
