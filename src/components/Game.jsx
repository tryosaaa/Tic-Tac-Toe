import React, { Component } from 'react'
import Board from "./Board"
import { Button, Typography,AppBar , Grid, Snackbar, Clear,Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';





class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

   
  
    render() {

      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      let status;
      if(this.state.stepNumber == 0){
        status = "The Game is Started"
      }
      else if(this.state.stepNumber == 9){
        status = "The Game is Over Without Winner";
      } else if (winner) {
        status = "The Winner is " + winner;
        
      } else {
        status = "Next player Turn  " + (this.state.xIsNext ? "X" : "O");
      }
  
      return (
        <Box bgcolor="rgb(255, 251, 251)">
          <Box marginBottom="1.2rem">
              <AppBar position="static" color= "secondary">
                <Box m="1.5rem">
                <Grid container style={{margin:'auto',width:'600px'}}>
                      <Grid item xs={1}>
                      <Avatar style={{width:"60px", height:"50px" }} alt="Remy Sharp" variant="rounded" src="https://lh3.googleusercontent.com/xv4-66b1Ot6YEUWoNZ5HDCLjWv9NkitxWEDvuwcHiWciBkLXiLH3OfvsH2EdPnNtl54" />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography variant="h4" align="center" component="h1"style={{width:'100%'}}>
                                     Tic Tac Toe Game Application 
                         </Typography>
                      </Grid>
                      </Grid>
                </Box>
          </AppBar>
          </Box>
          <div style={{display:'flex' ,justifyContent:'center',marginTop:'4.7rem'}} className="game-info">
            <Alert severity="info"><AlertTitle>Game Situation</AlertTitle><strong>{status}</strong></Alert>
            </div>
        <div className="game" style={{display:'flex',height:'45vh',justifyContent:'center',alignItems:'center',alignContent:'center',flexWrap:'wrap'}}>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
        </div>
        </Box>
      );
    }
  }



  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  


  
 
export default Game;



