import React, {Component} from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { conversasUsuarioFetch } from '../actions/AppActions';
import { Actions } from 'react-native-router-flux';


class Conversas extends Component {

    UNSAFE_componentWillMount() {
        this.props.conversasUsuarioFetch();
        this.iniciarBaseDados(this.props.conversas);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.iniciarBaseDados(nextProps.conversas);
    }

    iniciarBaseDados(conversas) {
        this.fonteDeDados = conversas; 
    }

    _renderItem(item){
        return(
            <TouchableHighlight  onPress={//Alterando o titulo, Enviando nome e email para a outra tela
                    () => Actions.conversa({ title: item.nome, contatoNome: item.nome, contatoEmail: item.email}) }
                    underlayColor='#DCDCDC'
                >
                <View style={{flex:1, padding:20, borderBottomWidth: 1, borderColor: '#CCC'}}>
                    <Text style={{fontSize:25 }}>{item.nome}</Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{flex:1, paddingBottom: 20}}>
                <FlatList 
                    data={this.fonteDeDados} 
                    keyExtractor={item => item.uid} 
                    renderItem={ ({item}) => this._renderItem(item)}                                         
                />
            </View>
        );
    }

}

mapStateToProps = state => {

    const conversas = _.map(state.ListaConversasReducer, (val,uid) => {
        return { ...val, uid};
    });

    return ({
        conversas
    })
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas)
