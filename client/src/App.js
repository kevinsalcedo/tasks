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
import { Grid, Grommet, Main } from "grommet";
import { grommet } from "grommet/themes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Grommet themeMode='light' theme={grommet} full>
        <Grid
          fill
          rows={["auto", "flex"]}
          columns={["auto", "flex"]}
          areas={[
            { name: "header", start: [0, 0], end: [1, 0] },
            { name: "main", start: [0, 1], end: [1, 1] },
          ]}
        >
          <Router>
            <Navbar gridArea='header' />
            <Main gridArea='main' responsive pad='medium' align='center'>
              <Alert />
              <Route exact path={PAGES.LANDING} component={Landing} />
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
          </Router>
        </Grid>
      </Grommet>
    </Provider>
  );
};

export default App;
