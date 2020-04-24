import { 
    MODIFICA_ADICIONA_CONTATO_EMAIL, 
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    MODIFICA_MENSAGEM
} from '../actions/types';

import { act } from 'react-test-renderer';
const INITIAL_STATE = {
    adiciona_contato_email: '',
    email_ja_cadastrado: '',
    cadastro_resultado_inclusao: false, 
    mensagem: ''
};


// Não recebo action de nenhum lugar. Criei aqui mesmo
export default (state = INITIAL_STATE, action) => {
    //console.log(action)
    switch(action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return { ...state, email_ja_cadastrado: action.payload }
        case ADICIONA_CONTATO_SUCESSO:
            return { ...state, cadastro_resultado_inclusao: action.payload, adiciona_contato_email: '' }
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload}
        default:
            return state; 
    }
}