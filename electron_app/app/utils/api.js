import fetch from 'isomorphic-fetch'

export const apiUrl = 'http://localhost:3001/api/';

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

export const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
      return response.text().then(function(text) {
        let json = text ? JSON.parse(text) : {};
        var error = new Error(json.message);
        throw error
      })
    }
};

export const parseJSON = (response) => {
    return response.text().then(function(text) {
        return text ? JSON.parse(text) : {}
    })
};

export const get = (url, token) => {
    console.log('GET');
    console.log(token);
    let headers = {};
    if (token) {
        headers['Authorization'] = "Bearer " + token;
    }

    return fetch(apiUrl + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        }
    })
        .then(checkStatus)
        .then(parseJSON)
};

export const post = (url, param = {}, token) => {
    console.log('POST');

    let headers = {};
    if (token) {
      headers['Authorization'] = "Bearer " + token;
    }

    return fetch(apiUrl + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(param)
    })
        .then(checkStatus)
        .then(parseJSON)
};

export const put = (url, param = {}) => {
    var authToken = getCookie('auth_token');
    console.log('PUT');
    console.log(authToken);

    let headers = {};
    if (authToken) {
        headers['Authorization'] = authToken;
    }

    return fetch(apiUrl + url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(param)
    })
        .then(checkStatus)
        .then(parseJSON)
};

export const patch = (url, param = {}) => {
    var authToken = getCookie('auth_token');
    console.log('PATCH');
    console.log(authToken);

    let headers = {};
    if (authToken) {
        headers['Authorization'] = authToken;
    }

    return fetch(apiUrl + url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(param)
    })
        .then(checkStatus)
        .then(parseJSON)
};
