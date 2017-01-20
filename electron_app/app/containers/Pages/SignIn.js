import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SignIn from '../../components/SignIn'
import { updateSession, setErrorMessage, updateLayoutTitle } from '../../actions'
import { signInLocalStrategy } from '../../actions/api'

const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTitle: (title) => {
      dispatch(updateLayoutTitle(title))
    },
    sendForm:(values) => {
      return dispatch(signInLocalStrategy(values))
        .then(values => {
          dispatch(updateSession(values));
          dispatch(push("/files"));
        })
        .catch(values => {
          dispatch(setErrorMessage(values.error.message));
        })
    }
  }
};

const SignInPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

export default SignInPage
