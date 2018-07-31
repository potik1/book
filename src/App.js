import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import { View } from 'react-native';
import book from './reducers/book/';
import {reducer as form} from 'redux-form';

import Router from './Router';

export default class App extends Component {

  render() {
    const store = createStore(combineReducers({
      book,
      form
    }), {}, applyMiddleware(thunk));
    return (
        <Provider store={store}>
          <View style={{flex: 1}}>
            <Router/>
          </View>
        </Provider>
    );
  }
}