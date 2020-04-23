import React, {Component} from 'react';
import { View, TextInput, Button, Text } from 'react-native';
// Decorar componentes
import {connect} from 'react-redux';
import { modificaAdicionaContatoEmail, adicionaContato} from '../actions/AppActions'; 


class AdicionarContato extends Component {

    renderAdicionarContato(){
        if(!this.props.cadastro_resultado_inclusao){
            return (
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TextInput 
                            placeholder='E-mail'
                            style={{fontSize: 20, height: 45, borderColor: 'gray', borderWidth: 1}} 
                            onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto) }
                            value={this.props.adiciona_contato_email}
                        />
                    </View>
            
                    <View style={{flex: 1}}>
                        <Button 
                            title="Adicionar" 
                            color="#115e54" 
                            onPress={() => this.props.adicionaContato(this.props.adiciona_contato_email) } 
                        />
                        <Text style={{ color:'#ff0000', fontSize: 20 }}>{this.props.email_ja_cadastrado}</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <View>
                    <Text style={{fontSize: 20}}>
                        Cadastro Realizado com Sucesso!
                    </Text>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
                {this.renderAdicionarContato()}        
            
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        // estou atualizando o valor da variável através do AppReducer
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
        email_ja_cadastrado: state.AppReducer.email_ja_cadastrado,
        cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
    }
)

export default connect(mapStateToProps, { modificaAdicionaContatoEmail, adicionaContato })(AdicionarContato);