import React, {Component} from 'react';
// decorando uma variavel parte 1
import { connect } from 'react-redux';
import _ from 'lodash'; 
import { View, Text, Image, TextInput, TouchableHighlight, FlatList } from 'react-native';
// decorando uma variavel parte 2
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions'; 
import firebase from 'firebase';
import b64 from 'base-64';

class Conversa extends Component {

    UNSAFE_componentWillMount() {
       
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados( this.props.conversa);
        
    }

    UNSAFE_componentWillReceiveProps(nextProps){

        if(this.props.contatoEmail != nextProps.contatoEmail) {
            this.props.conversaUsuarioFetch(nextProps.contatoEmail)
        }
        this.criaFonteDeDados(nextProps.conversa);
    }

    criaFonteDeDados( conversa ) {
        // criando uma variavel = recebendo contatos via mapeamento
        this.fonteDeDados = _.map(conversa);
    }

    _enviarMensagem() {
        if(this.props.mensagem != ''){
            const { mensagem, contatoNome, contatoEmail } = this.props;
            this.props.enviarMensagem(mensagem, contatoNome, contatoEmail)
        }else{
            alert("Campo Mensagem Vazio!")
        }
        
        
    }

    _renderItem(item){ 

        const {currentUser} = firebase.auth();
        const email = b64.encode(currentUser.email)
        
        if(item.emissor === email) {
            return(
                <View style={{alignItems: 'flex-end', marginTop: 5, paddingBottom: 5, marginLeft: 40}}>
                    <Text style={{fontSize:18, color: '#000', padding: 10, backgroundColor: '#DBF5B4', elevation: 1 }}>{item.mensagem}</Text>                    
                </View>
            )
        }else{       
        return(
            <View style={{alignItems: 'flex-start', marginTop: 5, paddingBottom: 5, marginRight: 40}}>
                <Text style={{fontSize:18, color: '#000', padding: 10, backgroundColor: '#F7F7F7', elevation: 1 }}>{item.mensagem}</Text>                    
            </View>
        )}       
        
    }
    
    

    render() {
        
        return (
            <View style={{flex:1, marginTop: 1, backgroundColor: '#eee4dc', padding: 10}}>
                
                <View style={{flex:1, paddingBottom: 20}}>
                    <FlatList
                        ref="flatList"  
                        onContentSizeChange={() => this.refs.flatList.scrollToEnd()}                 
                        data={this.fonteDeDados}                         
                        renderItem={ ({item}) => this._renderItem(item)} 
                        keyExtractor={item => item.uid}                                          
                    />
                </View>

                <View style={{flexDirection: 'row', height:60}}>
                    <TextInput
                        value={this.props.mensagem}                        
                        // Disparando uma Action - parte 4
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
                        placeholder='Digite uma mensagem'
                        multiline={true}
                    />                

                    <TouchableHighlight 
                        
                        onPress={this._enviarMensagem.bind(this)} 
                        underlayColor='#FFF'
                    >
                        <Image source={require('../imgs/enviar_mensagem.png')}  />
                    </TouchableHighlight>

                </View>

            </View>
        )
    }
}

// decorando uma variavel parte 3
mapStateToProps = state => {
                        // Transformando o objeto em array
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return {...val, uid};
    });

    return ({
        // variavel: onde ela se encontra
        conversa,
        mensagem: state.AppReducer.mensagem
    })
}
export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa)

//parametros do connect
// Mapa dos estados do componente, {actionsCreators} que podem ser disparadas
// As Actions creators são as funções que eu defino lá no componente AppReducer