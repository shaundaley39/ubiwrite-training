import React from "react";
import ReactDOM from 'react-dom';
import {Motion, spring} from "react-motion";
import {TransitionSpring,Spring,utils as RMutils} from "react-motion";

var targetTexts = require("./targettext.json");

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
    }
    if(newLetters.length > 0){
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
      </div>
    );
  }
});

const app = (
  <div className="container">
    <div id="pangram"><Pangram /></div>
    <h3 className="title"><a href="https://github.com/shaundaley39/ubiwrite-training"> Ubiwrite</a> Speed Training - Type the Pangram</h3>
  </div>
);
ReactDOM.render(app, document.getElementById('content') );
