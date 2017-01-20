// @flow
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const CHANGE_LOCALE = 'LOCALE/changeLocale';
export const FILES_UPDATE_LIST = 'FILES/updateFilesList';
export const PLAYLIST_UPDATE_LIST = 'PLAYLIST/updatePlaylistList';
export const MONITORS_UPDATE_LIST = 'MONITORS/updateMonitorsList';
export const USERS_UPDATE_LIST = 'USERS/updateUsersList';
export const LAYOUT_UPDATE_TITLE = 'LAYOUT/updateLayoutTitle';
export const LAYOUT_UPDATE_TOPBAR = 'LAYOUT/updateLayoutTopBar';
export const LAYOUT_OPEN_CREATE_DIALOG = 'LAYOUT/openCreateDialog';
export const SESSION_UPDATE = 'SESSION/updateSession';
export const SESSION_LOGOUT = 'SESSION/logOut';

export const changeLocale = locale => {
  return {
    type: CHANGE_LOCALE,
    locale
  }
};

export const updateLayoutTitle = layout => {
  return {
    type: LAYOUT_UPDATE_TITLE,
    layout
  }
};

export const updateLayoutTopBar = layout => {
  return {
    type: LAYOUT_UPDATE_TOPBAR,
    layout
  }
};

export const openCreateDialog = layout => {
  return {
    type: LAYOUT_OPEN_CREATE_DIALOG,
    layout
  }
};

export const updateFilesList = files => {
  return {
    type: FILES_UPDATE_LIST,
    files
  }
};

export const updatePlaylistList = playlist => {
  return {
    type: PLAYLIST_UPDATE_LIST,
    playlist
  }
};

export const updateMonitorsList = monitors => {
  return {
    type: MONITORS_UPDATE_LIST,
    monitors
  }
};

export const updateUsersList = users => {
  return {
    type: USERS_UPDATE_LIST,
    users
  }
};


export const updateSession = session => {
  return {
    type: SESSION_UPDATE,
    session
  }
};

export const logOut = session => {
  return {
    type: SESSION_LOGOUT,
    session
  }
};

export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export const setErrorMessage = error => {
  return {
    type: SET_ERROR_MESSAGE,
    error
  }
};
