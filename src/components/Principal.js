import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabBarMenu from './TabBarMenu'; 
import Conversas from './Conversas';
import Contatos from './Contatos';


const initialLayout = { width: Dimensions.get('window').width };

export default function Principal() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Conversas' },
    { key: 'second', title: 'Contatos' },
  ]);

  const renderScene = SceneMap({
    first: Conversas,
    second: Contatos,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      //renderTabBar={TabBarMenu}
      renderTabBar={props => <TabBarMenu {... props} /> }
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});