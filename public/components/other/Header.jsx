import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import {List, ListItem} from 'material-ui/List';

const styles = {
    header: {
        fontSize: '36px',
        lineHeight: '16px',
        paddingLeft: 35,
        fontWeight: 600,
        color: 'rgb(0, 188, 212)',
        textShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 5px, rgba(0, 0, 0, 0.117647) 0px 1px 2px'
    },
    vertical: {
        lineHeight: '56px',
        paddingRight: 10
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
}

export default class ToolbarExamplesSimple extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <h1 style={styles.header}>Librarz</h1>
                </ToolbarGroup>
                <ToolbarGroup>
                    <Link to="/" style={styles.vertical}>
                        <FlatButton label="Search Book" labelPosition="before" backgroundColor="rgb(0, 188, 212)" hoverColor="#fff"/>
                    </Link>
                    <Link style={styles.vertical} to="/add-book"><FlatButton label="Add Book" labelPosition="before" backgroundColor="rgb(0, 188, 212)" hoverColor="#fff"/></Link>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}