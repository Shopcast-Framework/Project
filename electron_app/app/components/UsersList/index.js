import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'
import { default as Config } from '../../utils/config'
import { default as Constant } from '../../utils/constant'
import ScrollArea from 'react-scrollbar';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import {amber700, transparent} from 'material-ui/styles/colors';

import style from './style.css'

class MonitorsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    const { locale, getCollection, session, updateTopBar, updateTitle } = this.props;

    updateTopBar(Constant.topBarUsers);
    updateTitle(Constant.titleUsers);

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
        <Paper zDepth={2} className={style.container}>
          <List>
            {collection.map(function(item, i) {
              return (
                <ListItem
                  key={item.id}
                  primaryText={item.username}
                  secondaryText={item.name + " - " + item.email}
                  leftIcon={item.role == 0 && <ActionGrade color={amber700} />}
                  insetChildren={item.role != 0}
                  rightAvatar={item.sex > 0 ? <Avatar src="images/default_f.png" /> : <Avatar src="images/default_h.png" />}
                  style={{fontSize: "1.3rem", fontWeight: "bold"}}
                />
              )
            })}
          </List>
        </Paper>
      </ScrollArea>
    );
  }
}

MonitorsList.PropTypes = {
  locale: PropTypes.string
};

MonitorsList.defaultProps = {
  locale: 'fr'
};

export default MonitorsList
