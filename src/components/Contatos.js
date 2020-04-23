import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ListItem } from 'react-native-elements';


import { contatosUsuarioFetch } from '../actions/AppActions';

const list = [
    {
        title: 'Registro 1',
        icon: 'av-timer'
    },
    {
        title: 'Registro 2',
        icon: 'flight-takeoff'
    },
    {
        title: 'Registro 3'
    },
];

class Contatos extends Component {
    

    UNSAFE_componentWillMount(){
        this.props.contatosUsuarioFetch();
    }

    render() {
        return (
            <View>
                {
                    list.map((item, i) => (
                        <ListItem 
                            key={i}
                            title={item.title}
                            leftIcon={{name: item.icon }}
                            bottomDivider
                            chevron
                        />
                    ))
                }
            </View>

        )
    }
}

mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })
    console.log(contatos);
    return {}
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);