import {cookiesGet, cookiesSet} from 'redux-cookies';
import * as API from '../utils/api'

export const signInLocalStrategy  = (values) => {
  values.strategy = "local";
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      API.post(`session`, values)
        .then(function (data) {
          console.log('request succeeded with JSON response', data);
          resolve(data);
        })
        .catch(function (payload) {
          console.log('request failed', payload);
          reject({error: payload});
        });
    });
  }
};

export const getFiles = (token) => {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      API.get(`file`, token)
        .then(function (data) {
          console.log('request succeeded with JSON response', data);
          resolve(data);
        })
        .catch(function (payload) {
          console.log('request failed', payload);
          reject({error: payload});
        });
    });
  }
};

export const getPlaylist = (token) => {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      API.get(`playlist`, token)
        .then(function (data) {
          console.log('request succeeded with JSON response', data);
          resolve(data);
        })
        .catch(function (payload) {
          console.log('request failed', payload);
          reject({error: payload});
        });
    });
  }
};

export const getMonitors = (token) => {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      API.get(`monitor`, token)
        .then(function (data) {
          console.log('request succeeded with JSON response', data);
          resolve(data);
        })
        .catch(function (payload) {
          console.log('request failed', payload);
          reject({error: payload});
        });
    });
  }
};

export const getUsers = (token) => {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      API.get(`user`, token)
        .then(function (data) {
          console.log('request succeeded with JSON response', data);
          resolve(data);
        })
        .catch(function (payload) {
          console.log('request failed', payload);
          reject({error: payload});
        });
    });
  }
};
