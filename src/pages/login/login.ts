import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioService } from '../../domain/usuario/usuario-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string;
  public senha: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioSrv: UsuarioService,
    private _alertCtrl: AlertController) {}

  efetuaLogin() {
    this._usuarioSrv
        .efetuaLogin(this.email, this.senha)
        .then(usuario => {
          console.log(usuario);
          this.navCtrl.setRoot(HomePage);
        })
        .catch((err) => {
          console.log(err);
          this._alertCtrl.create({
            title: "Problema no login",
            subTitle: "E-mail ou senha inválidos.",
            buttons: [{ text: "Ok" }]
          }).present();
        })
    
  }

}
