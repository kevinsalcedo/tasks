import React, { useEffect } from "react";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import "./App.css";

// UI
import AppContainer from "./components/layout/AppContainer";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
