import React from 'react';
import ReactDOM from 'react-dom';

/**
 * this is JSX, man
 * camelCase property instead of of HTML attribute names
 * e.g: className instead of class, tabIndex instead of tabindex
 * by default ReacDOM escapes user input
 * here the syntax is equivalent to JS:
 * const element = React.createElement(
  'h1',
  'Hello, world!'
);
 */
// Note, React must be in scope when using JSX
const element = <h1>Hello, World !</h1>;

ReactDOM.render(element, document.getElementById('id1'));

/**
 * React elements are immutable, once they are created, it
 * is not possible to change its attributes and its children
 * 
 * Note:
 *
 * In practice, most React apps only call ReactDOM.render() once. 
 * In the next sections we will learn how such code gets encapsulated
 * into stateful components.
 */
function tick() {
  const element = (
    <div>
      <h2> it is: {new Date().toLocaleTimeString()}</h2>
    </div>
  );

  ReactDOM.render(element, document.getElementById('id2'));
}

setInterval(tick, 1000);

/**
 * Conceptually, components are like JavaScript functions. 
 * They accept arbitrary inputs (called “props”) and 
 * return React elements describing what should appear on the screen.
 */


/**
 * Always start component name with upercase. 
 * React treat components starting with lowercase
 * as DOM tags
 */

// ES6 Class to define a component
class Welcome1 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const element3 = <Welcome1 name="man" />
ReactDOM.render(element3, document.getElementById('id3'));

// As below class has no intereset (only render method)
// function component can be used
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element4 = <Welcome name="woman"/>;
ReactDOM.render(element4, document.getElementById('id4'));


// Composing components
function App() {
  return (
    // note, without div, linter says: JSX expressions must have
    // one parent element
    <div>
      <Welcome name="a"/>
      <Welcome name="b"/>
      <Welcome name="c"/>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('id5')
)

/**
 * Note for the props:
 * All React components must act like pure functions with respect to their props.
 * 
 */

/**
 * Now working on the state
 * 
 **/

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  // we do not modify the state directly
  // like this.state.date = ...
  // because it wil not re render the component
  // only the constructor can do it
  tick() {
    this.setState({
      date: new Date()
    });
  }

  // The first time the component output has been rendered to the DOM,
  // or 'mounted' for React
  componentDidMount() {
    console.log('Mounted Clock');
    this.timerID = setInterval(() => {
      this.tick()
    }, 1000);
  }

  // When the component output will be removed from the DOM
  // or 'unmounted' for React
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return(
      <div>
        <h1> Awesome Clock</h1>
        <p> it is: {this.state.date.toLocaleTimeString()} </p>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('id7')
)



