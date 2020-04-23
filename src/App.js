import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'; 
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
//o index não precisa ser especificado
import reducers from './reducers';


export default class App extends Component{

    UNSAFE_componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyBYUkAItKzm_M3rlbtPwcEtYVzKjP9-ZzU",
            authDomain: "whatsapp-clone-99e03.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-99e03.firebaseio.com",
            projectId: "whatsapp-clone-99e03",
            storageBucket: "whatsapp-clone-99e03.appspot.com",
            messagingSenderId: "624229761159",
            appId: "1:624229761159:web:929350675ef256a8903822"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }

    render(){
        return(
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
           
        );
    }
}