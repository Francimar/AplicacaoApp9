import React, {Component} from 'react';
import { View, Text, TextInput, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { 
    modificaEmail, 
    modificaSenha,
    modificaNome, 
    cadastraUsuario    
} from '../actions/AutenticacaoActions';



class formCadastro extends Component{

    _cadastraUsuario(){

        /*const nome = this.props.nome;
        const email = this.props.email;
        const senha = this.props.senha;*/

        // Alternatvia para as 3 linhas acima
        const { nome, email, senha } = this.props;

        this.props.cadastraUsuario( {nome, email, senha} );
    }

    renderBtnCadastro() {
        if(this.props.loading_cadastro) {
            return(
                //alert("erro")
                <ActivityIndicator size="large" />
            )
        }
        return(
            <Button title="Cadastrar" color='#115e54' onPress={() => this._cadastraUsuario()} />
        )
    }

    render() {
        return(
            <ImageBackground style={{flex: 1, width: null}} source={require('../imgs/original.png')}>
                <View style={{ flex:1, padding:10 }}>

                    <View style={{ flex:4, justifyContent:'center' }}>
                        <TextInput 
                            placeholderTextColor='#fff' 
                            value={this.props.nome} 
                            style={{fontSize: 20, height: 45, borderColor: 'gray', borderWidth: 1}} 
                            placeholder='Nome' 
                            onChangeText={texto => this.props.modificaNome(texto)} 
                        />
                        <TextInput 
                            placeholderTextColor='#fff' 
                            value={this.props.email} 
                            style={{fontSize: 20, height: 45, borderColor: 'gray', borderWidth: 1}} 
                            placeholder='E-mail' onChangeText={texto => this.props.modificaEmail(texto)} 
                        />
                        <TextInput 
                            placeholderTextColor='#fff' 
                            value={this.props.senha} 
                            style={{fontSize: 20, height: 45, borderColor: 'gray', borderWidth: 1}} 
                            placeholder='Senha' 
                            onChangeText={texto => this.props.modificaSenha(texto)} 
                            secureTextEntry 
                        />  
                        <Text style={{ color: '#ff0000', fontSize:18 }}>{this.props.erroCadastro}</Text>                  
                    </View>

                    <View style={{ flex:1 }}>
                        {this.renderBtnCadastro()}
                    </View>

                </View>
            </ImageBackground> 
        );
    }
}


const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loading_cadastro: state.AutenticacaoReducer.loading_cadastro
    }
)
  
export default connect(
    mapStateToProps, 
    { 
        modificaEmail, 
        modificaSenha,   
        modificaNome,
        cadastraUsuario,   
    }
)(formCadastro);