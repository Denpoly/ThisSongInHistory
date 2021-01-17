import logo from '../resources/mainIcon.svg';
import React, { Component } from 'react';
class AppHeader extends Component{
    render() {
        return(
            <div class = "header">
                <div class = "textDiv">
                    <div>
                        <h1 class = "headerText"> This Song in History</h1>
                    </div>
                        <h2 class = "subHeaderText"> What was happening in the world when this song was written?</h2>
                    <div>
                    </div>
                    
                </div>
                <img src = {logo} class = "img"  width = "12%"/>
                
                
            </div>
        )
    }
}
export default AppHeader