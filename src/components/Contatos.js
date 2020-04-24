import React, {Component} from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { contatosUsuarioFetch } from '../actions/AppActions';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';


class Contatos extends Component {
    
    // Executa uma única vez no início da montagem antes do render
    UNSAFE_componentWillMount(){
        this.props.contatosUsuarioFetch();     
        this.criaFonteDeDados( this.props.contatos )   
    }

    // Executado sempre que houver alteração das propriedades
    // Executa após a primeira execução do componente
    UNSAFE_componentWillReceiveProps(nextProps){
        this.criaFonteDeDados( nextProps.contatos ) 
    }

    criaFonteDeDados( contatos ) {

        this.fonteDeDados = contatos;
    }

    listandoItens(contato) {
        console.log('contatos = ', contato);
        <View style={{flex:1, padding:20, borderBottomWidth: 1, borderColor: '#CCC'}}>
            <Text style={{fontSize:25 }}>{contato.nome}</Text>
            <Text style={{fontSize:18 }}>{contato.email}</Text>
        </View>
    }

    render() {
        return (
            <View>
                {
                    <FlatList 
                        data={this.fonteDeDados} 
                        keyExtractor={item => item.uid}                  
                        renderItem={({ item }) => (
                            <TouchableHighlight
                                onPress={ () => Actions.conversa() }
                            >
                                <View style={{flex:1, padding:20, borderBottomWidth: 1, borderColor: '#CCC'}}>
                                    <Text style={{fontSize:25 }}>{item.nome}</Text>
                                    <Text style={{fontSize:18 }}>{item.email}</Text>
                                </View>
                            </TouchableHighlight>                        
                        )}                       
                    />
                }
            </View>

        )
    }
}

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })
    
    return { contatos }
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);