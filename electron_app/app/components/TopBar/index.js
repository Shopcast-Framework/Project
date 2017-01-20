import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'
import { default as Constant } from '../../utils/constant'

import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';

import IconAdd from 'material-ui/svg-icons/content/add';

import { lightGreen500, lightBlue300 } from 'material-ui/styles/colors';

import style from './style.css'

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { topBar, locale, title } = this.props;

    return (
      <AppBar
        title={<span>{translations[locale][title]}</span>}
        iconElementRight={<IconButton tooltip={translations[locale].btnCreate}><IconAdd/></IconButton>}
        style={{backgroundColor: lightBlue300, marginBottom: "30px"}}
        iconStyleLeft={{display:"none", visibility: "none"}}
      />
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
