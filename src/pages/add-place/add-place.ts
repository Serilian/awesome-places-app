import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: 50.334900,
    lgn: 19.561120
  };

  isLocationSet = false;

  constructor(private geolocation: Geolocation, private modalCtrl: ModalController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.isLocationSet});
    modal.present();
    modal.onDidDismiss((data)=> {
      if (data) {
        this.location = data.location;
        this.isLocationSet = true;
      }
    });
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Fetching your location...'
    });
    loader.present();
    const toast = this.toastCtrl.create({
      message: 'Error fetching data',
      closeButtonText: 'Ok',
      duration: 2500
    });
    this.geolocation.getCurrentPosition()
      .then(location => {
        console.log(location);
        this.location.lat = location.coords.latitude;
        this.location.lgn = location.coords.longitude;
        this.isLocationSet = true;
        loader.dismiss();
      })
      .catch((error) => {
        console.log(error);
        loader.dismiss();
        toast.present();
      });
  }

}
