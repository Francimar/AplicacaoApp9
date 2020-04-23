import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './src/App';


const app9 = props => (
    <App />
)
/*export default class app9 extends Component{
    render() {
        return(
            <App />
        );
    }
}*/
   
       
AppRegistry.registerComponent('app9', () => app9);
