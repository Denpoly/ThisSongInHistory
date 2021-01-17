import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const { Component } = require("react");

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
function getListComponent(classes, props){
    if (props.events.length > 0) {
        return <List className = {classes.root}>
        { props.events.map((event) => {
                return (<ListItem  width = "100%">
                         <ListItemText class = {classes.content}
                             primary=  {<Typography variant="h6" style={{ color: '#009400' }}>{event.date + ", " + event.year}</Typography>}
                             secondary={event.description}>
                             
                         </ListItemText>
                     </ListItem>)})}
    </List>
    }
    else {
        return (<List className = {classes.root}>
            <ListItem  width = "100%">
                <ListItemText class = {classes.content}
                    primary=  {<Typography variant="h6" style={{ color: '#009400' }}>No Historical data found for this song :(</Typography>}>
                </ListItemText>
            </ListItem>
        </List>)
    }
}
export default function EventPane(props){
    const classes = useStyles();
    let listComponent = getListComponent(classes, props);
    return(
        <div  class = "info">
            {listComponent}
        </div>
    )
}
