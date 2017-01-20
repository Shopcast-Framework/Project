import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import MonitorsList from '../../components/MonitorsList'
import { updateMonitorsList, setErrorMessage, updateLayoutTopBar, updateLayoutTitle } from '../../actions'
import { getMonitors } from '../../actions/api'

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    collection: state.monitors.collection,
    session: state.session
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    getCollection: (token) => {
      return dispatch(getMonitors(token))
        .then(value => {
          dispatch(updateMonitorsList(value));
        })
        .catch(value => {
          dispatch(setErrorMessage(value.error.message));
          dispatch(updateMonitorsList({}));
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

const MonitorsListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorsList);

export default MonitorsListPage
