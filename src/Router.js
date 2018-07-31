import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import List from './components/book/List';
import Create from './components/book/Create';
import Show from './components/book/Show';
import Update from './components/book/Update';

const RouterComponent = () => {


  return (
      <Router>
          <Scene key="main" >
            <Scene
                rightTitle="Add"
                onRight={() => Actions.bookCreate()}
                key="bookList" component={List}
                title="List of books"
                initial
            />
            <Scene key="bookCreate" component={Create}
                   title="Add a new book" />
            <Scene key="bookShow" component={Show}
                   title="Book" />
            <Scene key="bookUpdate" component={Update}
                   title="Update Book" />
          </Scene>
      </Router>
  );
};

export default RouterComponent;
