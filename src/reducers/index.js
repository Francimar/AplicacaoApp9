/*
Este arquivo é quem faz a ligação dos reducers com a aplicação
aqui fica todos os reducers que controlam cada action 
específica. Ele é importado onde é preciso. principalmente
na classe principal (App) no provider
*/

import {combineReducers} from 'redux';
import AutenticacaoReducer from './AutenticacaoReducers';
import AppReducer from './AppReducer';
import ListaContatosReducer from './ListaContatosReducer';


export default combineReducers ({

    // Como o conteúdo tem o mesmo nome da chave, não preciso colocar
    //AutenticacaoReducer: AutenticacaoReducer,
    AutenticacaoReducer,
    AppReducer,
    ListaContatosReducer
});