import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Constants
import PAGES from "../../strings/pages";
// Page Components
import Landing from "./Landing";
import Sidebar from "../layout/Sidebar";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "./Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";

import "../../App.css";

// UI
import { Box, Grommet, Main } from "grommet";
import { grommet } from "grommet/themes";

const AppContainer = ({ isAuthenticated }) => {
  return (
    <Grommet themeMode='light' theme={grommet} full>
      <Box direction='row' fill>
        <Router>
          <Sidebar gridArea='sidebar' />

          <Main
            gridArea='main'
            responsive
            pad='medium'
            align='center'
            background='linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)'
          >
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
      </Box>
    </Grommet>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AppContainer);
