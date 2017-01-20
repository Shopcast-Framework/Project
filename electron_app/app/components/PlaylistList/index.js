import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'
import { default as Config } from '../../utils/config'
import { default as Constant } from '../../utils/constant'
import ScrollArea from 'react-scrollbar';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import style from './style.css'

class PlaylistList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { locale, getCollection, session, updateTopBar, updateTitle } = this.props;

    updateTopBar(Constant.topBarPlaylist);
    updateTitle(Constant.titlePlaylist);

    getCollection(session.token);
  }

  render() {
    const { locale, collection, onChangeRoute } = this.props;

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
                <img src={'images/playlist-'+i%4+'.jpg'} className={style.image}/>
                <div className={style.information}>
                  <h3 className={style.title}>{item.name}</h3>
                  <RaisedButton onTouchTap={() => (onChangeRoute('/playlist/'+item.id))} secondary={true} label={translations[locale].see} className={style.btnSee}/>
                </div>
              </Paper>
            )
          })}
        </div>
      </ScrollArea>
    );
  }
}

PlaylistList.PropTypes = {
  locale: PropTypes.string
};

PlaylistList.defaultProps = {
  locale: 'fr'
};

export default PlaylistList
