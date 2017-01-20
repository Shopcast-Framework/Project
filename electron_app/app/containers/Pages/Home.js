import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dashboard from '../../components/Home'

const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

const DashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default DashboardPage
