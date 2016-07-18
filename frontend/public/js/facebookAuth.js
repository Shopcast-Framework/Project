/* globals FB */
window.fbAsyncInit = function() {
    'use strict';

    var addElement = function(form, name, value) {
        var elem = document.createElement('input');
        elem.setAttribute('type', 'hidden');
        elem.setAttribute('name', name);
        elem.setAttribute('value', value)
        form.appendChild(elem);
   };

    document.getElementById('facebookBtn').onclick = function() {
        FB.login(function(response) {
            var datas = response.authResponse;
            var form = document.createElement('form');

            form.method = 'POST';
            form.action = '/session'
            addElement(form, 'access_token', datas.accessToken);
            addElement(form, 'strategy', 'facebook');
            addElement(form, 'status', response.status);
            document.body.appendChild(form);
            form.submit();
        });
    };

    FB.init({
        appId      : '751447004955328',
        xfbml      : true,
        version    : 'v2.5'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
