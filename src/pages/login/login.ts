import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {User} from "../../interfaces/IUser";
import {MenuPage} from "../menu/menu";
import {OrderSubmitPage} from "../order-submit/order-submit";
import {HomePage} from "../home/home";


@Component ({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage{

    //User, confirmPassword, registerOrSignInInputs, usingEmailOrGoogle
    user = {} as User;
    confirm: string;
    firstName: string;
    lastName: string;
    registering: boolean = false;
    email: boolean = true;


      constructor(public afAuth: AngularFireAuth,
                  public navCtrl: NavController,
                  private navParams: NavParams,
                  private toastCtrl: ToastController) {
      }


        async login(bool: boolean) {
        this.email = bool;
        //If using the email login and not the google login
        if (this.email){
            try {
                const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
                this.displayResults(result);
                this.user.password = '';
            }
            catch (e) {
                this.showError(e);
          }
        }
        //If using the google login
        else{
          let provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider).then((result) => {
              console.log(result);
              // The signed-in user info.
              let googleUser = result.user;
              console.log(googleUser);
              console.log(googleUser.displayName);
              //the false means wasn't logged in earlier
              this.pushPage();
          })
            .catch((error) => {
              // Handle Errors here.
              console.log(error.code);
              console.log(error.message);
              console.log(error.email);
              console.log(error.credentials)
            });
        }
      }



        async register() {
            if (this.confirm === this.user.password){
              try {
                const result = await this.afAuth.auth.createUserWithEmailAndPassword(
                    this.user.email,
                    this.user.password
                );
                  console.log(result);
                  let emailUser = firebase.auth().currentUser;
                  console.log(emailUser);
                  emailUser.updateProfile({
                      displayName: this.firstName + ' ' + this.lastName,
                      photoURL: ""
                  });
                  this.displayResults(result);
              }
              catch (e) {
                  this.showError(e)
              }
              console.log("Passwords matched");

          }
          else{
            let toast = this.toastCtrl.create({
              message: "Please verify that your passwords match.",
              duration: 1800,
              position: 'top'
            });
            toast.present()
          }
        }
      changeShow(bool: boolean){
        //If login
        this.registering = bool;
      }


        displayResults(result){
            if (result){
                console.log("Signed in!!!");
                console.log(this.user.name);
                //the false means wasn't logged in earlier
                this.pushPage();
            }
            else{
                let toast = this.toastCtrl.create({
                    message: "Please verify that your email or password is correct",
                    duration: 1800,
                    position: 'top'
                });
                toast.present()
            }

      }

      showError(error){
        console.error(error);
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 1800,
          position: 'top'
        });
        toast.present();
      }

      pushPage(){
          if (this.navParams.data[0] === false){
              this.navCtrl.setRoot(OrderSubmitPage, [
                  this.navParams.data[1],
                  this.navParams.data[2],
              ])
          }
          else{
              this.navCtrl.setRoot(HomePage);
              this.navCtrl.push(MenuPage);
          }
      }
}



