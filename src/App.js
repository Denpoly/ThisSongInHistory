import logo from './resources/icon.svg';
import AppHeader from "./components/Header"
import './App.css';
import  RestRequest from './backend/RestRequest';
import  EventRequest from './backend/EventRequests'
import AutoComplete from "./components/AutoComplete"
import { constructSpotifySearchQuery } from './backend/URIconstructors';
import React, { Component } from 'react';
import EventPane from './components/EventPane'
import SongCardContent from './components/SongCardContent'
class App extends React.Component {

  constructor(){
    super()
    this.state = {
      stateResults: false,
      events: [],
      track: null
    }
    this.section1 = React.createRef();
  }
  scrollToContent() {
    this.section1.current.scrollIntoView({behavior: 'smooth'});
  }
  clickMe = (track) => {
    console.log(track);
    let chosen = track
    let date = track.releaseDate.split("-");
    let year = parseInt(date[0]);
    let month = parseInt(date[1])
    let day = parseInt(date[2])
    // console.log("day: " + day + " month: " + month)
    // console.log("https://byabbe.se/on-this-day/" + month + "/" + day + "/events.json");
    // RestRequest.get("https://byabbe.se/on-this-day/" + -1 + "/" + 13 + "/events.json", null).then((val) => {
    //   console.log("found "+ val);
    // }).catch((val) => {
    //   console.log("rejected" + val);
    // });
    EventRequest.getAllEventsOfMonthYear(month, year).then((events) => {
      console.log(events);
      this.setState({
        stateResults: true,
        events: events,
        track: chosen
      })
      console.log(this.state.stateResults);
      this.scrollToContent();
    });
    //   this.setState({
    //   activeSuggestion: 0,
    //   filteredSuggestions: [],
    //   showSuggestions: false,
    //   userInput: e.currentTarget.innerText})

  }

  render() {
    return (
      <div className="App">
      <AppHeader></AppHeader>
      <div className="App-header">
        <div >
          <AutoComplete  click = {this.clickMe}padding-top = "10%" suggestions={['White', 'Black', 'Green', 'Blue', 'Yellow', 'Red'] }
          />
        </div>
        <div ref = {this.section1} class = "content">
          {this.state.stateResults ? <SongCardContent track = {this.state.track}></SongCardContent>: null}  
          {this.state.stateResults ? <EventPane  events = {this.state.events}></EventPane>: null}
        </div> 
      </div>
    </div>
    )
  }

 
}

export default App;
