import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // I added parenthesis because the following lines assume
    // to much knowledge about operators associativity and precedence
    //if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
     if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a];
    }
  }
  return null;
}

// this is a function component
// it contains only render method
// and don't have its own state
function Square(props) {
    // props are passed by the parent element
    return (
      /*
      * heavier version
      *
      <button className="square" onClick={() => {
        // when a square is clicked, the onClick function provided
        // by the board (parent) is called
        props.onClick()
      }}>*/
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
  
class Board extends React.Component {
  renderSquare(i) {
    // We split the returned element into multiple lines for readability,
    // and added parentheses so that JavaScript doesn’t insert a semicolon 
    // after return and break our code.}
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }

  render() {    
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    // get a shallow copy of the squares array
    const squares = current.squares.slice()
    // ensure we do nothing if game is over
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O' ;
    
    this.setState({
      // concat is used instead of push
      // because it does not mutate the array
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
    // when the game state changes, the game and squares component
    // re-render automatically
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // I feel again this is very redundant with handleClick
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move :
        'Go to game start';
      
      return (
        // key is important for React to know how to render a list
        // and changes
        // array indices are 'not recommended' TODO: why ?
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } 
    else {
      // I don't like doing same thing twices in
      // handleClik and here
      // TODO: 'computed state' ?
      const nextPlayer = this.state.xIsNext ? 'X' : 'O'
      status = 'Next player: ' + nextPlayer;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  