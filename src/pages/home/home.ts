import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';

import * as firebase from 'firebase/app';

import {MenuPage} from '../menu/menu';
import {LoginPage} from '../login/login';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    styles: []
})
export class HomePage implements OnDestroy {
    //Login or logout button?

    loggedIn: boolean;
    user: any;

    constructor(public navCtrl: NavController, private toastCtrl: ToastController, private cdr: ChangeDetectorRef) {
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad");
        this.user = firebase.auth().onAuthStateChanged(status => {
            console.log('status', status);
            this.loggedIn = !!status;
            console.log(this.loggedIn);
            this.cdr.detectChanges();
        });
        this.cdr.detectChanges();
    }

    logOut() {
        firebase.auth().signOut().then(() => {
            this.loggedIn = false;
            // Sign-out successful.
            let toast = this.toastCtrl.create({
                message: "Signed Out",
                duration: 1800,
                position: 'top'
            });
            toast.present();
        }).catch((error) => {
            // An error happened.
            console.error(error);
            let toast = this.toastCtrl.create({
                message: error.message,
                duration: 1800,
                position: 'top'
            });
            toast.present();
        });
    }

    gotToMenu() {
        this.navCtrl.push(MenuPage,);
    }

    gotToLogin() {
        this.navCtrl.push(LoginPage);
    }

    ngOnDestroy() {
        this.cdr.detach();
        // this.user.unsubscribe();
    }
}


