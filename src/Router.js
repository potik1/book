import React from 'react';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import List from './components/book/List';
import Create from './components/book/Create';
import Show from './components/book/Show';
import Update from './components/book/Update';
import {delayRefresh} from './utils/helpers';

const RouterComponent = () => {

  return (
      <Router>
        <Stack key="main">
          <Scene
              rightTitle="Add"
              onRight={() => Actions.bookCreate()}
              key="bookList" component={List}
              title="List of books"
              initial
          />
          <Scene key="bookCreate" component={Create}
                 title="Add a new book"/>
          <Scene key="bookShow" component={Show}
                 title="Book"
                 leftTitle="< List of books"
                 onLeft={() => {
                   Actions.pop();
                   delayRefresh();
                 }}/>
          <Scene key="bookUpdate" component={Update}
                 title="Update Book"/>
        </Stack>
      </Router>
  );
};

export default RouterComponent;
