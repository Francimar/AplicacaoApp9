import React, {Component} from 'react';
// decorando uma variavel parte 1
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableHighlight } from 'react-native';
// decorando uma variavel parte 2
import { modificaMensagem, enviarMensagem } from '../actions/AppActions'; 

class Conversa extends Component {
    render() {
        return (
            <View style={{flex:1, marginTop: 50, backgroundColor: '#eee4dc', padding: 10}}>
                
                <View style={{flex:1, paddingBottom: 20}}>
                    <Text>Suas mensagens</Text>
                </View>

                <View style={{flexDirection: 'row', height:60}}>
                    <TextInput
                        value={this.props.mensagem}                        
                        // Disparando uma Action - parte 4
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
                    />                

                    <TouchableHighlight onPress={() => this.props.enviarMensagem(this.props.mensagem)} underlayColor='#FFF'>
                        <Image source={require('../imgs/enviar_mensagem.png')}  />
                    </TouchableHighlight>

                </View>

            </View>
        )
    }
}

// decorando uma variavel parte 3
mapStateToProps = state => {
    return ({
        // variavel: onde ela se encontra
        mensagem: state.AppReducer.mensagem
    })
}
export default connect(mapStateToProps, { modificaMensagem, enviarMensagem })(Conversa)

//parametros do connect
// Mapa dos estados do componente, {actionsCreators} que podem ser disparadas
// As Actions creators são as funções que eu defino lá no componente AppReducer