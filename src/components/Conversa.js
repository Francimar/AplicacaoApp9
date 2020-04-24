import React, {Component} from 'react';
import { View, Text, Image, TextInput, TouchableHighlight } from 'react-native';



export default class Conversa extends Component {
    render() {
        return (
            <View style={{flex:1, marginTop: 50, backgroundColor: '#eee4dc', padding: 10}}>
                
                <View style={{flex:1, paddingBottom: 20}}>
                    <Text>Suas mensagens</Text>
                </View>

                <View style={{flexDirection: 'row', height:60}}>
                    <TextInput
                        style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
                    />                

                    <TouchableHighlight onPress={() => false} underlayColor='#FFF'>
                        <Image source={require('../imgs/enviar_mensagem.png')}  />
                    </TouchableHighlight>

                </View>

            </View>
        )
    }
}