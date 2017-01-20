import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import UsersList from '../../components/UsersList'
import { updateUsersList, setErrorMessage, updateLayoutTopBar, updateLayoutTitle } from '../../actions'
import { getUsers } from '../../actions/api'

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    collection: state.users.collection,
    session: state.session
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    getCollection: (token) => {
      return dispatch(getUsers(token))
        .then(value => {
          dispatch(updateUsersList(value));
        })
        .catch(value => {
          dispatch(setErrorMessage(value.error.message));
          dispatch(updateUsersList({}));
        })
    },
    updateTopBar: (topBar) => {
      dispatch(updateLayoutTopBar(topBar));
    },
    updateTitle: (title) => {
      dispatch(updateLayoutTitle(title));
    },
    onChangeRoute: (route) => {
      dispatch(push(route));
    }
  }
};

const UsersListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);

export default UsersListPage
