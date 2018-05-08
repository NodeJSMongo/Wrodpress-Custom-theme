import React, { Component } from 'react';

class Welcome extends Component{
  render(){
    return (
      <div className="cards__welcome">
        <p className="cards__welcome__section-title">YouTube Tutorial</p>
        <p className="cards__welcome__description">
          Lots of youtube tutorial is comming soon. Stay connected with my School of Virtual Eduacation for Webmasters.
        </p>
        <p><a href="#" className="btn">Learn more about SVEW</a></p>
      </div>
    );
  }
}

export default Welcome;
