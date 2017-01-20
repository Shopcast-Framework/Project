import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PlaylistList from '../../components/PlaylistList'
import { updatePlaylistList, setErrorMessage, updateLayoutTopBar, updateLayoutTitle } from '../../actions'
import { getPlaylist } from '../../actions/api'

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    collection: state.playlist.collection,
    session: state.session
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    getCollection: (token) => {
      return dispatch(getPlaylist(token))
        .then(value => {
          dispatch(updatePlaylistList(value));
        })
        .catch(value => {
          dispatch(setErrorMessage(value.error.message));
          dispatch(updatePlaylistList({}));
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

const PlaylistListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistList);

export default PlaylistListPage
