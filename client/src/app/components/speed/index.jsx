import React from "react";

var Speed = React.createClass({
  getInitialState: function(){
    var d = new Date();
    return {
      start: d.getTime(),
      charcount: 0
    };
  },
  completed: function( numCompleted){
    const {charcount} = this.state;
    this.setState({charcount : numCompleted + charcount});
  },
  render(){
    const {start, charcount} = this.state;
    var d = new Date();
    var finish = d.getTime();
    var cpm = Math.round( 60000.0*charcount/(finish - start));
    if (charcount < 30){
      return (
        <h3 className="text" id="speed">Speed: unknown </h3>
      );
    } else {
      return (
        <h3 className="text" id="speed">Speed: {cpm} cpm</h3>
      );
    }
  }
});
module.exports = Speed;
