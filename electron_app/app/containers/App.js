// @flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { push } from 'react-router-redux'
import Layout from './Layout'

import {lightBlue500, amber700} from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    accent1Color: amber700
  },
})


class App extends Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Layout children={children}/>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
  return {
    locale: state.locale,
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
};


export default connect(
  mapStateToProps, {}
)(App)


