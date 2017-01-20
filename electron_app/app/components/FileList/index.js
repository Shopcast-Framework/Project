import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'
import { default as Constant } from '../../utils/constant'
import { default as Config } from '../../utils/config'
import ScrollArea from 'react-scrollbar';

import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import style from './style.css'

class FileList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { locale, getCollection, session, updateTopBar, updateTitle } = this.props;

    updateTopBar(Constant.topBarFiles);
    updateTitle(Constant.titleFiles);

    getCollection(session.token);
  }

  render() {
    const { locale, collection, onChangeRoute, createDialog } = this.props;

    return (
      <ScrollArea
        speed={0.8}
        className="area"
        contentClassName="content"
        horizontal={false}
      >
        <div className={style.container}>
          {collection.map(function(item, i) {
            return (
              <Paper zDepth={2} className={style.box} key={item.id}>
                {!item.mimetype.indexOf("image") && <img src={Config.apiUrl + "cdn/" + item.path} className={style.image} />}
                {!item.mimetype.indexOf("video") && <video controls src={Config.apiUrl + "cdn/" + item.path} className={style.video} />}
                <div className={style.information}>
                  <h3 className={style.title}>{item.name}</h3>
                  <RaisedButton onTouchTap={() => (onChangeRoute('/files/'+item.id))} secondary={true} label={translations[locale].see} className={style.btnSee}/>
                </div>
              </Paper>
            )
          })}
        </div>
      </ScrollArea>
    );
  }
}

FileList.PropTypes = {
  locale: PropTypes.string
};

FileList.defaultProps = {
  locale: 'fr'
};

export default FileList
