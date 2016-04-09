/** @jsx React.DOM */
var React = window.React = require('react');
var ReactDOM = require('react-dom');

var res = String.fromCharCode( Math.floor( Math.random()*93));

var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

var Prompt = React.createClass({
  render: function() {
    return <div> {String.fromCharCode( this.props.target)} </div>;
  }
});

var Title = React.createClass({
    handleTest: function(e) {
      if (e.charCode === this.props.target) {
//        alert('Success!');
        var code = Math.floor( 33 + Math.random()*93);
        ReactDOM.render( <Prompt target={code} />, document.getElementById('prompt') );
        ReactDOM.render( <Title target={code} />,  document.getElementById('kinput') );
      }
      if (e.keyCode === this.props.target) {
//        alert('Success!');
      }
    },
    render: function() {
      return(
        <div>
        <textarea onKeyPress={this.handleTest} />
        </div>
      );
    }
  });
var Diagram = React.createClass({
  updateDiagram: function(e) {
  //
  },
  render: function() {
    return <div> {String.fromCharCode( this.props.target)} </div>;
  }
});
var code = Math.floor( 33 + Math.random()*93);
ReactDOM.render(  <Hello name="World" />, document.getElementById('hello') );
ReactDOM.render( <Prompt target={code} />, document.getElementById('prompt') );
ReactDOM.render( <Title target={code} />,  document.getElementById('kinput') );



