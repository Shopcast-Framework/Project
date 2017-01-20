import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'
import moment from 'moment'

import {deepOrange500} from 'material-ui/styles/colors'
import {red500} from 'material-ui/styles/colors'

import ReactMaterialUiNotifications from 'react-materialui-notifications'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import IconMessage from 'material-ui/svg-icons/communication/message'
import IconError from 'material-ui/svg-icons/alert/error'
import IconClose from 'material-ui/svg-icons/navigation/close'

import './style'

class Toast extends Component {
  constructor(props) {
    super(props);
    this.showErrorNotification = this.showErrorNotification.bind(this);
  }

  componentDidUpdate(){
  }

  showNotification(){
    ReactMaterialUiNotifications.showNotification({
      title: 'Title',
      autoHide: 1,
      additionalText: `Some message to be displayed 0`,
      icon: <IconMessage />,
      iconBadgeColor: deepOrange500,
      overflowText: "joe@gmail.com",
      timestamp: moment().format('h:mm A')
    });
  }

  showErrorNotification(){
    const { locale, errorMessage } = this.props;
    ReactMaterialUiNotifications.showNotification({
      title: translations[locale].errorTitle,
      autoHide: 2000,
      additionalText: errorMessage,
      icon: <IconError />,
      iconBadgeColor: red500,
      timestamp: moment().format('h:mm A'),
      overflowContent: <div>
        <FlatButton
          label="dismiss"
          icon={<IconClose />}
        />
      </div>,
    });
  }

  render() {
    const { locale, errorMessage, type, resetError } = this.props;

    const actions = [
      <FlatButton
        label={translations[locale].discard}
        primary={true}
        onTouchTap={() => (resetError())}
      />,
    ];

    if (errorMessage != null)
    {
      switch (type){
        case "error":
          this.showErrorNotification();
      }
    }

    // return (
    //   <ReactMaterialUiNotifications
    //     desktop={true}
    //     transitionName={{
    //           leave: 'fadeOut',
    //           leaveActive: 'fadeOut',
    //           appear: 'zoomInUp',
    //           appearActive: 'zoomInUp'
    //         }}
    //     transitionAppear={true}
    //     transitionLeave={true}
    //   />
    // );
    return (
      <div>
        {type == "error" && <Dialog
          actions={actions}
          modal={false}
          title={translations[locale].titleError}
          open={errorMessage != null}
          onRequestClose={() => (resetError())}
        >
          {errorMessage}
        </Dialog>}
      </div>
    );
  }
}

Toast.PropTypes = {
  locale: PropTypes.string,
  type: PropTypes.string
};

Toast.defaultProps = {
  locale: 'fr'
};

export default Toast
