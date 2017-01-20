import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FileList from '../../components/FileList'
import { updateFilesList, setErrorMessage, updateLayoutTopBar, updateLayoutTitle } from '../../actions'
import { getFiles } from '../../actions/api'

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    collection: state.files.collection,
    session: state.session
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCollection: (token) => {
      return dispatch(getFiles(token))
        .then(value => {
          dispatch(updateFilesList(value));
        })
        .catch(value => {
          dispatch(setErrorMessage(value.error.message));
          dispatch(updateFilesList({}));
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

const FileListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);

export default FileListPage
