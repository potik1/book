import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { View } from 'react-native';
import reducers from './reducers/book/';

import Router from './Router';

export default class App extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <Router/>
          </View>
        </Provider>
    );
  }
}
