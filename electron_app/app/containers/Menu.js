import { connect } from 'react-redux'
import MenuBar from '../components/MenuLeft'
import { changeLocale, logOut } from '../actions'
import { push } from 'react-router-redux'

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    session: state.session,
    isAdmin: state.session.isAdmin,
    currentRoute: state.routing.locationBeforeTransitions.pathname
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
    logOut: () => {
      dispatch(logOut());
      dispatch(push("signIn"));
    }
  }
};

const Menu = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);

export default Menu
