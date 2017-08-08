import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { HomePage } from '../home/home';

import { Carro } from '../../domain/carro/carro';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento.service';

@Component({
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public agendamento: Agendamento;

  private _alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoSrv: AgendamentoService,
    private _alertCtrl: AlertController
  ) {
    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');
    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta = this._alertCtrl.create({
      title: "Aviso",
      buttons: [{
        text: "Ok",
        handler: () => this.navCtrl.setRoot(HomePage)
      }]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  agenda() {
    this._agendamentoSrv.agenda(this.agendamento)
      .then(() => {
        this._alerta.setSubTitle('Agendamento realizado com sucesso');
        this._alerta.present();
      })
      .catch(err => {
        console.log(err);
        this._alerta.setSubTitle('Não foi possível realizar o agendamento, tente mais tarde');
        this._alerta.present();
      })
  }

}
