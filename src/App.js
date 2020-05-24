import React from 'react';
import {  Dimmer, Loader } from 'semantic-ui-react';
import { Switch,BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Auth from './components/Auth';
import Route from './components/Route';

import Login from './scenes/Login';
// import Projects from './scenes/Projects';


// const Project = React.lazy(() => import('./scenes/Project'));

const App = () => {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        hideProgressBar
        autoClose={5000}
        closeOnClick
      />
      
        <Auth>
          <React.Fragment>
            <React.Suspense
              fallback={
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
              }
            >

              <Router>
                <Switch>
                <Route path="/" component={Login} />

                {/* <Route
                  path="/projects"
                  exact
                  component={Projects}
                  protectedRoute
                /> */}
               
                {/* <Route
                  path="/projects/:projectId"
                  component={Project}
                  protectedRoute
                /> */}
                </Switch>
          </Router>
            </React.Suspense>
          </React.Fragment>
        </Auth>
    </React.Fragment>
  );
};

export default App;
