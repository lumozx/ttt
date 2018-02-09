import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
function whoWin(squares){
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
	for(let i = 0;i<lines.length;i++){
		const [a,b,c] = lines[i];
		if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
			return squares[a]
		}
	}
	return null;
}
class Board extends React.Component{

	renderSquare(i){
		return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} />
	}
	render(){
		
		return(
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
      </div>)
	}
}
function Square(props){
	return(
		<button className="square" onClick={props.onClick}>
				{props.value}
			</button>
		)
}
class Game extends React.Component{
	constructor(){
		super();
		this.state={
			history: [{
        		squares: Array(9).fill(null)
      		}],
			isX:true,
			stepmove :0
		}
	}
	handleClick(i){
		const history = this.state.history.slice(0,this.state.stepmove+1);
		//历史记录是在这一步还原的，由还原步数剪切历史记录，并在下面接上新操作的同事覆盖原状态
    	const current = history[history.length - 1];
		const squares = [...current.squares];
		if(whoWin(squares)||squares[i]){
			return
		}
		squares[i] = this.state.isX ? 'x' : 'o';
		this.setState({
			history: history.concat([{
        	squares: squares
      	}]),
			isX : !this.state.isX,
			stepmove:history.length
		})
	}
	jumpTo(move){
		this.setState({
			stepmove:move,
			isX:(move%2)?false:true
		})
	}
	render(){
		const history = this.state.history.slice(0,this.state.stepmove+1);;
    	const current = history[this.state.stepmove];
		const winner = whoWin(current.squares);
		const moves = history.map((step,move)=>{
			const desc = move ?'MOVE #'+ move:'GAME START';
			return (
				<li key={move}><a href="#" onClick={() => this.jumpTo(move)}>{desc}</a> </li>
				)
		})
		console.log(this.state.history)
		let status;
		if(winner){
			status = 'winner' + winner;

		}else{
			status = 'next player :'+(this.state.isX ? 'x' : 'o');
		}
		return(
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
			)
	}
}
ReactDOM.render(<Game />, document.getElementById('root'));