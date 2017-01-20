import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Toast from '../components/Toast'
import { resetErrorMessage } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    type: ownProps.type,
    locale: state.locale,
    errorMessage: state.errorMessage,
    currentRoute: state.routing.locationBeforeTransitions.pathname
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetError: (locale) => {
      dispatch(resetErrorMessage())
    }
  }
};

const Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast);

export default Notification
