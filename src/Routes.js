import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import Conversa from './components/Conversa';

export default class Routes extends Component{
   
    render(){
        return(
           <Router navigationBarStyle={styles.navBar} > 
               <Stack key='root'> 
                    
                   <Scene 
                        key='formLogin'       
                        component={FormLogin}       
                        title="Login"   
                        titleStyle={styles.navTitle}  
                        hideNavBar={true} 
                    />
                    <Scene 
                        key='principal'      
                        component={Principal}      
                        title="Página Principal" 
                        titleStyle={styles.title} 
                        hideNavBar={true} 
                    />
                   <Scene 
                        key='formCadastro'    
                        component={FormCadastro}    
                        title="Cadastro" 
                        titleStyle={styles.title} 
                    />
                   <Scene 
                        key='boasVindas'      
                        component={BoasVindas}      
                        title="Boas-Vindas" 
                        titleStyle={styles.title}
                        hideNavBar={true} 
                    />                   
                    <Scene 
                        key='adicionarContato'      
                        component={AdicionarContato}      
                        title="Adicionar Contatos" 
                        titleStyle={styles.title}                         
                    />
                    <Scene 
                        key='conversa'      
                        component={Conversa}      
                        title="Conversas" 
                        titleStyle={styles.title}                         
                    />
               </Stack>
           </Router>
        );
    }
}

const styles = StyleSheet.create({
   navBar: {
    backgroundColor: '#115E54'
    
   },
   navTitle: {
    textAlign: 'center',
    flex: 1, 
    color: '#FFF'
   },
   title: {
    color: '#FFF' 
   }
});