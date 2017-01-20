import { connect } from 'react-redux'
import TopBarComponent from '../components/TopBar'
import { changeLocale } from '../actions'
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.layout.title,
    topBar: state.layout.topBar,
    locale: state.locale,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

const TopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarComponent);

export default TopBar
