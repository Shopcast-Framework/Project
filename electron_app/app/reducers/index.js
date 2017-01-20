import * as ActionTypes from '../actions'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';

function locale(state = 'fr', action) {
  const { type } = action;

  switch (type) {
    case ActionTypes.CHANGE_LOCALE:
      return action.locale;
    default:
      return state;
  }
}

function files(state = {collection:[]}, action) {
  const { type } = action;
  let tmpState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.FILES_UPDATE_LIST:
      tmpState.collection = action.files.files;
      return tmpState;
    default:
      return state;
  }
}

function playlist(state = {collection:[]}, action) {
  const { type } = action;
  let tmpState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.PLAYLIST_UPDATE_LIST:
      tmpState.collection = action.playlist.playlists;
      return tmpState;
    default:
      return state;
  }
}

function monitors(state = {collection:[]}, action) {
  const { type } = action;
  let tmpState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.MONITORS_UPDATE_LIST:
      tmpState.collection = action.monitors.monitors;
      return tmpState;
    default:
      return state;
  }
}

function users(state = {collection:[]}, action) {
  const { type } = action;
  let tmpState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.USERS_UPDATE_LIST:
      tmpState.collection = action.users.users;
      return tmpState;
    default:
      return state;
  }
}

function layout(state = {title:"", topBar: "", createDialog: null}, action) {
  const { type } = action;
  let tmpState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.LAYOUT_UPDATE_TITLE:
      tmpState.title = action.layout;
      return tmpState;
    case ActionTypes.LAYOUT_UPDATE_TOPBAR:
      tmpState.topBar = action.layout;
      return tmpState;
    case ActionTypes.LAYOUT_OPEN_CREATE_DIALOG:
      tmpState.createDialog = action.layout;
      return tmpState;
    default:
      return state;
  }
}

function session(state = {isLogged: false, username:"", name:"", avatar:"", email:"", token: ""}, action) {
  const { type } = action;
  let tmpState = Object.assign({}, state);

  switch (type) {
    case ActionTypes.SESSION_UPDATE:
      const session = action.session;
      tmpState.username = session.user.username;
      tmpState.name = session.user.name;
      tmpState.role = session.user.role;
      tmpState.isAdmin = session.user.role == 0;
      tmpState.email = session.user.email;
      tmpState.sex = session.user.sex;
      tmpState.isLogged = true;
      tmpState.token = session.user.token;
      return tmpState;
    case ActionTypes.SESSION_LOGOUT:
      tmpState.username = "";
      tmpState.name = "";
      tmpState.role = null;
      tmpState.isAdmin = false;
      tmpState.email = "";
      tmpState.sex = "";
      tmpState.isLogged = false;
      tmpState.token = "";
      return tmpState;
    default:
      return state;
  }
}

function errorMessage(state = null, action) {
  const { type, error } = action;

  switch (type) {
    case ActionTypes.RESET_ERROR_MESSAGE:
      return null;
    case ActionTypes.SET_ERROR_MESSAGE:
      return error;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  errorMessage,
  routing: routerReducer,
  locale,
  layout,
  session,
  files,
  users,
  playlist,
  monitors,
  form: formReducer
});

export default rootReducer
