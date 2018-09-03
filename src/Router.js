import React from 'react';
import { Router, Stack } from 'react-native-router-flux';
import BookRoutes from './router/book';

const RouterComponent = () => {

  return (
      <Router>
        <Stack key="root">
          {BookRoutes}
        </Stack>
      </Router>
  );
};

export default RouterComponent;
