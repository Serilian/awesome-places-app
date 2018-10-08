import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera} from '@ionic-native/camera';
import {PlacesService} from "../../services/places.service";
import {File} from '@ionic-native/file'


declare var cordova: any;

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
  imageUrl:string = '';

  constructor(private geolocation: Geolocation,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private file: File,
              private camera: Camera,
              private pservice: PlacesService,
              private navCtr: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onSubmit(form: NgForm) {
    this.pservice.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 50.334900,
      lgn: 19.561120
    };
    this.imageUrl = '';
    this.isLocationSet = false;
    this.navCtr.popToRoot();
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

  onTakePhoto() {
    this.camera.getPicture({
      saveToPhotoAlbum: true,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG
    })
      .then(imageData => {
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
          .then((data)=> {
            this.imageUrl = data.nativeURL;
            this.camera.cleanup();
            this.file.removeFile(path, currentName);
          })
          .catch(err => {
            this.imageUrl = '';
            const toast = this.toastCtrl.create({
              message: 'Could not save the image. PLease try again!',
              duration: 2500
            });
            toast.present();
          });
        this.imageUrl = imageData;
        this.camera.cleanup();
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Could not access the camera. Please try again!',
          duration: 2500
        });
        toast.present();
        console.log('Cant reach camera: ' + error)
      })
  }


}
