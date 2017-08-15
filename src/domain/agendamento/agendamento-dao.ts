import { Injectable } from '@angular/core';
import { Agendamento } from './agendamento';
import { Storage } from '@ionic/storage';
import { Carro } from '../../domain/carro/carro';

@Injectable()
export class AgendamentoDao {

    constructor(private _storage: Storage) {}

    private _getKey(agendamento: Agendamento) {
        return agendamento.email + agendamento.data.substr(0,10);
    }

    salva(agendamento: Agendamento) {
        return this._storage.set(this._getKey(agendamento), agendamento);
    }

    isDuplicado(agendamento: Agendamento) {
        let key = this._getKey(agendamento);

        return this._storage
                    .get(key)
                    .then(dado => {
                        return dado ? true : false;
                    });
    }

    listaTodos() {
        let agendamentos = [];

        return this._storage.forEach(rs => {
            let carro = new Carro(rs.carro.nome, rs.carro.preco);
            let agendamento = new Agendamento(carro, rs.valor, rs.endereco, rs.email, rs.data, rs.confirmado);
            agendamentos.push(agendamento);            
        })
        .then(() => agendamentos)
    }
}