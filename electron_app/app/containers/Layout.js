import { connect } from 'react-redux'
import LayoutComponent from '../components/Layout'
import { changeLocale } from '../actions'
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.layout,
    children: ownProps.children,
    locale: state.locale,
    session: state.session,
    errorMessage: state.errorMessage,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeLocale: (locale) => {
      dispatch(changeLocale(locale))
    },
    onChangeRoute: (route) => {
      dispatch(push(route));
    },
  }
};

const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutComponent);

export default Layout
