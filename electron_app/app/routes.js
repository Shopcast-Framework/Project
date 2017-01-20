// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/Pages/Home';
import FileListPage from './containers/Pages/FileList';
import PlaylistListPage from './containers/Pages/PlaylistList';
import MonitorsListPage from './containers/Pages/MonitorsList';
import UsersListPage from './containers/Pages/UsersList';
import SignInPage from './containers/Pages/SignIn';

export default (store) => {
  const requireSignIn = (nextState, replace, cb) => {
    const { session } = store.getState();

    if (!session.isLogged) {
      replace('/signIn');
    }
    return cb();
  };

  const requireSignOut = (nextState, replace, cb) => {
    const { session } = store.getState();

    if (session.isLogged) {
      replace('/dashboard');
    }
    return cb();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} onEnter={ requireSignIn }/>
      <Route onEnter={ requireSignOut }>
        <Route path="/signIn" component={SignInPage} />
      </Route>
      <Route onEnter={ requireSignIn }>
        <Route path="/files" component={FileListPage} />
        <Route path="/playlist" component={PlaylistListPage} />
        <Route path="/monitors" component={MonitorsListPage} />
        <Route path="/users" component={UsersListPage} />
      </Route>
    </Route>
  );
}
