import React from "react";
import ReactDOM from 'react-dom';
import {Motion, spring} from "react-motion";
import {TransitionSpring,Spring,utils as RMutils} from "react-motion";

var targetTexts = require("./targettext.json");
var charmap = require("./charmap.json");

var locations = {
  "LTh":{"cx":16, "cy":78 , "alt":"LThumb"},
  "L1":{"cx":38, "cy":40 , "alt":"L1"},
  "L2":{"cx":64, "cy":36 , "alt":"L2"},
  "L3":{"cx":91, "cy":42 , "alt":"L3"},
  "L4":{"cx":109, "cy":58 , "alt":"L4"},
  "L5":{"cx":43, "cy":61 , "alt":"L5"},
  "L6":{"cx":65, "cy":58 , "alt":"L6"},
  "L7":{"cx":86, "cy":62 , "alt":"L7"},
  "L8":{"cx":103, "cy":75 , "alt":"L8"},
  "RT":{"cx":224, "cy":78 , "alt":"RThumb"},
  "R1":{"cx":202, "cy":40 , "alt":"R1"},
  "R2":{"cx":176, "cy":36 , "alt":"R2"},
  "R3":{"cx":149, "cy":42 , "alt":"R3"},
  "R4":{"cx":131, "cy":58 , "alt":"R4"},
  "R5":{"cx":197, "cy":61 , "alt":"R5"},
  "R6":{"cx":175, "cy":58 , "alt":"R6"},
  "R7":{"cx":154, "cy":62 , "alt":"R7"},
  "R8":{"cx":137, "cy":75 , "alt":"R8"}
};

var Pangram = React.createClass({
  getInitialState: function(){
    var letters = this.getTarget();
    return {
      letters: letters,
      length: letters.length
    };
  },
  getTarget: function(){
    var targets = targetTexts["targettext"]["pangrams"];
    var targetString = targets[Math.floor(Math.random()*targets.length)];
    var targetArray = targetString.split("");
    return targetArray;
  },
  componentDidMount: function() {
    window.addEventListener("keypress",this.handleKeyPress)
  },

  handleKeyPress(e) {
    const {charCode} = e.charCode;
    const {letters} = this.state;
    const letter = `${String.fromCharCode(e.charCode)}`;
    var newLetters = letters.slice(0);
    if(letter === letters[0]) {
      newLetters.splice(0, 1);
      this.refs['speed'].completed(1);
    }
    if(newLetters.length > 0){
      this.refs['hands'].setCharacter(newLetters[0]);
      this.setState({letters: newLetters});
    } else {
      newLetters = this.getTarget();
      this.setState({letters: newLetters, length: newLetters.length });
    }
  },

  // TransitionSpring Methods

  getEndValue: function() {
    let values = {};
    const {letters} = this.state;
    const {length} = this.state;
    var offset = length - letters.length
    for (var i = 0; i < letters.length; i++) {
      values[i+offset] = {
        key: letters[i],
        width: {val: 50},
        scale: {val: 1},
        margin: {val: 5},
      }
    }
    console.log(values);
    return values;
  },

  willEnter: function(key) {
    return {
      width: {val: 0},
      margin: {val: 0},
      scale: {val: 0},
    }
  },

  willLeave: function(key) {
    return {
      width: {val: 0},
      margin: {val: 0},
      scale: {val: 0},
    }
  },
  render() {
    return (
      <div>
      <TransitionSpring
        endValue={this.getEndValue()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {values =>
          <div className="letters">
            {Object.keys(values).map(letter => {
              const {scale,width,margin,key} = values[letter];
              const widthValue = Math.ceil(width.val-0.5);
              const marginValue = Math.ceil(margin.val-0.5);

              let styles = {
                transform: `scale(${scale.val})`,
                height: widthValue,
                width: widthValue,
                margin: marginValue,
                borderRadius: widthValue,
              };

              return (
                <span
                  key={"#"+letter}
                  className="letter"
                  style={styles}>
                  {key}
                </span>
              )
            })}
          </div>
        }
      </TransitionSpring>
        <div id="hand-holder"> <Hands ref="hands" character={this.state.letters[0]} /></div>
        <Speed ref="speed" />
      </div>
    );
  }
});

var Hands = React.createClass({
  getInitialState: function(){
    return {
      character: this.props.character,
      hidden : "hidden"
    };
  },
  setCharacter : function (character){
    this.setState({character: character, hidden: "hidden"});
    this.scheduleReveal();
  },
  scheduleReveal : function (){
    var that = this;
    setTimeout(function() {
      that.show();
    }, 1000);
  },
  componentWillMount : function () {
    this.scheduleReveal();
  },
  show : function () {
    this.setState({hidden : ""});
  },
  render() {
    const {character} = this.state;
    var contactL = charmap[character]["L"];
    var contactR = charmap[character]["R"];
    var locationL = locations[contactL];
    var locationR = locations[contactR];
    var hand_path = "M 4.5338 3.88151 C 5.2838,3.63151 5.5838,5.33151 5.7838,6.48151 C 5.9838,7.63151 6.5338,9.78151 6.9838,9.73151 C 7.4338,9.68151 7.5338,7.58151 7.4838,6.63151 C 7.4338,5.68151 7.0338,3.38151 8.0838,3.48151 C 9.1338,3.58151 8.6338,5.78151 8.7338,6.68151 C 8.8338,7.58151 8.6838,10.0315 9.1338,10.2315 C 9.5838,10.4315 9.88115,8.12835 10.1812,7.02835 C 10.4812,5.92835 10.8838,3.83151 11.7338,4.33151 C 12.5838,4.83151 11.6761,6.47835 11.5261,7.47835 C 11.3761,8.47835 10.6338,11.2315 10.9838,11.5815 C 11.3338,11.9315 12.1338,9.68151 12.3338,9.03151 C 12.5338,8.38151 13.0364,6.13467 13.7338,6.53151 C 14.4312,6.92835 13.4838,8.53151 13.3338,9.23151 C 13.1838,9.93151 12.4812,11.6784 12.2312,12.4784 C 11.9812,13.2784 11.6183,16.6252 11.3761,18.0784 C 10.4683,17.8752 6.66832,18.1252 5.32606,17.9284 C 5.27606,16.6284 3.24214,13.9232 2.5338,12.6315 C 1.82547,11.3398 0.83645,9.43467 1.7338,8.83151 C 2.63115,8.22835 2.8838,10.5815 3.4338,11.4315 C 3.9838,12.2815 4.78115,13.3284 4.9838,13.2315 C 5.18645,13.1346 5.4838,11.3315 5.2838,10.5315 C 5.0838,9.73151 4.73115,7.37835 4.58115,6.77835 C 4.43115,6.17835 3.7838,4.13151 4.5338,3.88151z"
    return (
      <div id="hands">
          <svg className={this.state.hidden} viewBox="0 0 250 180" width="250" height="180" fill="currentcolor" position="absolute">
            <a transform="scale(-8,8) translate(-30,0)">
              <path d={hand_path}></path>
            </a>
            <a transform="scale(8)">
              <path d={hand_path}></path>
            </a>
            {contactL != 0 &&
            <circle alt={locationL['alt']} cx={locationL['cx']} cy={locationL['cy']} r={4} fill="red" />}
            {contactR != 0 &&
            <circle alt={locationR['alt']} cx={locationR['cx']} cy={locationR['cy']} r={4} fill="red" />}
          </svg>
      </div>
    );
  }
});

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

const app = (
  <div className="container">
    <div id="pangram"><Pangram /></div>
    <h3 className="title"><a href="https://github.com/shaundaley39/ubiwrite-training"> Ubiwrite</a> Speed Training - Type the Pangram</h3>
  </div>
);
ReactDOM.render(app, document.getElementById('content') );
