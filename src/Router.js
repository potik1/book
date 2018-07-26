import React from 'react';
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';

import List from './components/book/List';
import Create from './components/book/Create';
import Show from './components/book/Show';
import Update from './components/book/Update';

const RouterComponent = () => {

  return (
      <Router >
        <Stack key="root" hideNavBar>
          <Scene key="main" >
            <Scene
                rightTitle="Add new"
                onRight={() => Actions.bookCreate()}
                key="list" component={List}
                title="List od books"
                initial
            />
            <Scene key="bookCreate" component={Create}
                   title="Add a new book"/>
            <Scene key="bookShow" component={Show}
                   title="Edit Book"/>
            <Scene key="bookUpdate" component={Update}
                   title="Update Book"/>
          </Scene>
        </Stack>
      </Router>
  );
};

export default RouterComponent;
