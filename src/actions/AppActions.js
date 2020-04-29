import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash'

import { 
    MODIFICA_ADICIONA_CONTATO_EMAIL, 
    MODIFICA_EMAIL, 
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSAS_USUARIO
} from './types';

export const modificaAdicionaContatoEmail = texto => {
    
    return{
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = email => {
    
    return dispatch => {
        let emailB64 = b64.encode(email);

        firebase.database().ref(`/contato/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    // email do contato a ser adicionado
                    const dadosUsuario = _.first(_.values(snapshot.val()));

                    // Recuperando o usuario autenticado
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = b64.encode(currentUser.email);
                    // criando uma nova ramificação no banco e adicionando o email
                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email, nome: dadosUsuario.nome })
                        .then(() => adicionaContatoSucesso(dispatch))
                        .catch(erro => adicionaContatoErro(erro.message, dispatch))                   

                }else{
                    dispatch(
                        {
                            type: ADICIONA_CONTATO_ERRO,
                            payload: 'E-mail informado não corresponde a um usuário válido!'
                        }
                    )
                }
            })
    }
    

    // once -> pega um snapshot do banco uma única vez no que eu passo: nesse caso, contatos
    // on -> mesma coisa só que fica escutando para pegar alterações
    // then -> promessa que vai dá certo. Se deu certo, faça isso

}

const adicionaContatoErro = (erro, dispatch) => {
    dispatch (
        {
            type: ADICIONA_CONTATO_ERRO,
            payload: erro
        }
    )
}

const adicionaContatoSucesso = dispatch => (
    dispatch(
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true
        }
    )
)

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {                
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = texto => {
    return ({
        type: MODIFICA_MENSAGEM,
        // Essa variável texto é a mesma lá do arquivo conversa
        // recebida por parâmetro aqui
        payload: texto
    })
}

// TESTANDO O BANDO DE DADOS
export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
    // dados do usuario
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email; 
    return dispatch => {

        const usuarioEmailB64 = b64.encode(usuarioEmail)
        const contatoEmailB64 = b64.encode(contatoEmail)
        const emailCodificado = codificarEmail(usuarioEmail, contatoEmail);
        console.log('email: ', emailCodificado);


        // COMENTED 1
        firebase.database().ref(`/mensagens/${emailCodificado}`)
            .push({ mensagem, emissor: usuarioEmailB64, receptor: contatoEmailB64}) // push -> incllusão de um novo registro
            .then(() => { // armazenando o cabeçalho do usuário
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                .set({nome: contatoNome , email: contatoEmail})  //Set ->  Ver se já existe um registro e sobre-escreve
                .then(() => dispatch ({ type: ENVIA_MENSAGEM_SUCESSO}))
            })
            .then(() => { // armazenar o cabeçalho do contato
                // Pegando o nome do contato do banco (posso não ter aquele contato)
                firebase.database().ref(`/contato/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {
                        // transformando o objeto em array com o lodash
                        const dadosUsuario = _.first(_.values(snapshot.val()))

                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ nome: dadosUsuario.nome, email: usuarioEmail})
                    })
            })

    }
    
}

export const codificarEmail = (usuarioEmail, contatoEmail) => {
    alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
                'j', 'l', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 
                's', 't', 'u', 'v', 'w', 'y', 'x', 'z', '@',
                '-', '_','.']

    code = ''

    if (usuarioEmail.length > contatoEmail.length) {

        for (let i = 0; i < usuarioEmail.length; i++) {
            code = code + (alfabeto.indexOf(usuarioEmail[i]) + alfabeto.indexOf(contatoEmail[i]));
        }
    } else {
        for (let i = 0; i < contatoEmail.length; i++) {
            code = code + (alfabeto.indexOf(usuarioEmail[i]) + alfabeto.indexOf(contatoEmail[i]));
        }
    }

    return code;
}

export const conversaUsuarioFetch = contatoEmail => {
    const { currentUser } = firebase.auth();
    
    let usuarioEmailB64 = b64.encode(currentUser.email)
    const emailCodificado = codificarEmail(currentUser.email, contatoEmail);

    return dispatch => {
        firebase.database().ref(`/mensagens/${emailCodificado}`)
            // como é o on, vai ficar escutando o bando e sempre que houver mudança nas
            // conversas, ele vai disparar essa action
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })
    }
}

export const conversasUsuarioFetch  = () => {

    const { currentUser } = firebase.auth();    

    return dispatch => {
        let usuarioEmailB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot => {
            dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() })            
        })
    }
}



/*
COMENTED 1
Está sendo gravado no banco a mensagem que o usuario mandou e o email dele
e o email do destino. Se isso funcionar (then) eu gravo a mesma informação
invertendo apenas os contatos de email. Essa lógica é implementada pelo
tipo e = envio
tipo r = receber
*/