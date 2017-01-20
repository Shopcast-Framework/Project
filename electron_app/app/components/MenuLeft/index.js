import React, { Component, PropTypes } from 'react'
import { default as translations } from './i18n'
import { Link } from 'react-router'

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';

import IconDashboard from 'material-ui/svg-icons/action/dashboard';
import IconFile from 'material-ui/svg-icons/editor/attach-file';
import IconPlaylist from 'material-ui/svg-icons/file/folder';
import IconMonitor from 'material-ui/svg-icons/action/settings-ethernet';
import IconCalendar from 'material-ui/svg-icons/action/event';
import IconUser from 'material-ui/svg-icons/social/person';
import IconExit from 'material-ui/svg-icons/action/exit-to-app';
import IconFlag from 'material-ui/svg-icons/content/flag';

import { red500, lightGreen500, lightBlue300, amber500 } from 'material-ui/styles/colors';

import style from './style.css'

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class Menu extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.currentRoute);
  }

  menuValue(route){
    const values = {
      "/": 0,
      "/files": 1,
      "/playlists": 2,
      "/monitors": 3,
      "/calendar": 4,
      "/users": 5
    };

    return values[route];
  }

  render() {
  const { locale, onChangeRoute, logOut, onChangeLocale, isAdmin, session } = this.props;


    return (
      <Drawer open={true} docked={true}>
        <AppBar
          title={<span>{session.username}</span>}
          iconElementRight={session.sex > 0 ? <Avatar src="images/default_f.png" /> : <Avatar src="images/default_h.png" />}
          style={{backgroundColor: lightBlue300, marginBottom: "0", padding: "28px 24px"}}
          iconStyleLeft={{display:"none", visibility: "none"}}
        />
        <SelectableList defaultValue={1}>
          {/*<ListItem*/}
            {/*value={this.menuValue("/")}*/}
            {/*primaryText={translations[locale].dashboard}*/}
            {/*leftAvatar={<IconDashboard />}*/}
            {/*onTouchTap={() => (onChangeRoute('/'))}*/}
          {/*/>*/}
          <ListItem
            value={this.menuValue("/files")}
            primaryText={translations[locale].files}
            leftAvatar={<IconFile />}
            onTouchTap={() => (onChangeRoute('/files'))}
          />
          <ListItem
            value={this.menuValue("/playlists")}
            primaryText={translations[locale].playlists}
            leftAvatar={<IconPlaylist />}
            onTouchTap={() => (onChangeRoute('/playlist'))}
          />
          <ListItem
            value={this.menuValue("/monitors")}
            primaryText={translations[locale].monitors}
            leftAvatar={<IconMonitor />}
            onTouchTap={() => (onChangeRoute('/monitors'))}
          />
          {/*<ListItem*/}
            {/*value={this.menuValue("/calendar")}*/}
            {/*primaryText={translations[locale].calendar}*/}
            {/*leftAvatar={<IconCalendar />}*/}
            {/*onTouchTap={() => (onChangeRoute('/calendar'))}*/}
          {/*/>*/}
          {isAdmin && <ListItem
            value={this.menuValue("/users")}
            primaryText={translations[locale].users}
            leftAvatar={<IconUser />}
            onTouchTap={() => (onChangeRoute('/users'))}
          />}
          <Divider />
          <ListItem
            value={-1}
            primaryText={translations[locale].logOut}
            leftAvatar={<IconExit style={{color: red500}}/>}
            onTouchTap={() => (logOut())}
            style={{color: red500}}
          />
          <ListItem
            value={-2}
            leftAvatar={<IconFlag />}
            primaryText={translations[locale].fr}
            onTouchTap={() => (onChangeLocale("fr"))}
          />
          <ListItem
            value={-3}
            leftAvatar={<IconFlag />}
            primaryText={translations[locale].en}
            onTouchTap={() => (onChangeLocale("en"))}
          />
        </SelectableList>
      </Drawer>
    );
  }
}

Menu.PropTypes = {
  locale: PropTypes.string.isRequired
};

Menu.defaultProps = {
};

export default Menu
