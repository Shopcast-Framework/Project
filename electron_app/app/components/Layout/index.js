import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'
import TopBar from '../../containers/TopBar'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Menu from '../../containers/Menu';
import Notification from '../../containers/Notification'

import style from './style.css'

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { locale, children, session, layout } = this.props;

    return (
      <div id="main">
        <Notification type="error"/>
        {session.isLogged && <Menu locale={locale}/>}
        <div className={style.container}>
          {session.isLogged && <TopBar />}
          {children}
        </div>
      </div>
    );
  }
}

Layout.PropTypes = {
  children: PropTypes.object,
  locale: PropTypes.string
};

Layout.defaultProps = {
};

export default Layout
