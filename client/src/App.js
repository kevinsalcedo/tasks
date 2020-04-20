import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Constants
import PAGES from "./strings/pages";
// Page Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import "./App.css";

// UI
import { Grommet, Main } from "grommet";
import theme from "./components/layout/ui/theme";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Grommet theme={theme}>
          <Navbar />
          <Route exact path={PAGES.LANDING} component={Landing} />
          <Main responsive pad='xlarge'>
            <Alert />
            <Switch>
              <Route exact path={PAGES.LOGIN} component={Login} />
              <Route exact path={PAGES.REGISTER} component={Register} />
              <PrivateRoute
                exact
                path={PAGES.DASHBOARD}
                component={Dashboard}
              />
            </Switch>
          </Main>
        </Grommet>
      </Router>
    </Provider>
  );
};

export default App;
