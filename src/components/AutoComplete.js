import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RestRequest from '../backend/RestRequest';
import {constructSpotifySearchQuery} from "../backend/URIconstructors"
import SpotifyDataService from "../backend/SpotifyDataService"
import Keys from "../sensitive/keys"
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import "./components.scss"
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
export class Autocomplete extends Component {
    
  static propTypes = {};
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: '',
        typing: false,
        typingTimeout: 0
      };
  }
  render() {
    const {
        onChange,
        onClick,
        onKeyDown,
        state: {
          activeSuggestion,
          filteredSuggestions,
          showSuggestions,
          userInput
        }
      } = this;
    const classes = this.props.classes;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <List width = "100%">
            {filteredSuggestions.map((suggestion, index) => {
                if (index <=3) {
                    return (
                        <div class = "result" >
                            <ListItem  id = {index} onClick={onClick} width = "100%">
                              <ListItemAvatar>
                                  <Avatar alt="Remy Sharp" src= {suggestion.albumCoverUrl} />
                              </ListItemAvatar>
                                  <ListItemText width = "auto" color = "black"
                                      font-size = "9vw"
                                      primary={<Typography variant="h6" style={{ color: '#009400' }}>{suggestion.name}</Typography>}
                                      secondary = {suggestion.artist}
                                      />
                            </ListItem>
                            <Divider component="li" width = "100%"/>
                        </div>
                    );
                }
            })}
          </List>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }
    return (     
    <React.Fragment>
        <input
            class = "form"
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            placeholder= "Enter song title"
        />
        {suggestionsListComponent}
    </React.Fragment>
    );
  }
  onChange = (e) => {
    var change = e;
    //console.log(change.currentTarget.value);
    console.log(this.state)
    let that = this;
    let suggestions;
    const userInput = change.currentTarget.value;
    this.setState({userInput: userInput})
    if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
     }
    if (userInput != "") {
        that.setState({
            filteredSuggestions: [],
            typing: false,
            typingTimeout: setTimeout(function () {
                RestRequest.getAuthKey(Keys.clientID + ":" + Keys.clientSecret).then( (val) => {
                    RestRequest.get("https://api.spotify.com/v1/search" + constructSpotifySearchQuery(userInput),val).then((val)=> {
                        console.log(val)
                        console.log("api call  " +userInput)
                        suggestions = SpotifyDataService.getTrackListfromResponse(val);
                        console.log(suggestions)
                        const filteredSuggestions = suggestions;
                        // suggestions.filter(
                        // (suggestion) =>
                        //     suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
                        // );
                        that.setState({
                            activeSuggestion: 0,
                            filteredSuggestions: filteredSuggestions,
                            showSuggestions: true,
                        });
                    })
                });
            }, 500)
        });
        console.log(userInput)
        
    }
    else {
        this.setState({
            showSuggeestion: false,
            typing:false,
            typingTimeout: 0
         });
    }
    
  };
  onClick = (e) => {
    //this.props.click(e)
    let track = e.currentTarget
    let id = track.id
    let param = this.state.filteredSuggestions[id]
    this.props.click(param)
  //   let track = e.currentTarget
  //   let id = track.id
  //   //console.log(this.state.filteredSuggestions)
  //   console.log(this.state.filteredSuggestions[id]);
  //   let chosen = this.state.filteredSuggestions[id];
  //   this.setState({
  //     activeSuggestion: 0,
  //     filteredSuggestions: [],
  //     showSuggestions: false,
  //     userInput: e.currentTarget.innerText
  //   });

};
}


export default Autocomplete;