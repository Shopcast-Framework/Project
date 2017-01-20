import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';

import './style'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { locale } = this.props;

    return (
      <div>
        <RaisedButton label="Defauloot" />
      </div>
    );
  }
}

Home.PropTypes = {
  locale: PropTypes.string
};

Home.defaultProps = {
  locale: 'fr'
};

export default Home
