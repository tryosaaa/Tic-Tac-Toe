import React, { Component } from "react";
import Board from "./Board";
import {
  Button,
  Typography,
  AppBar,
  Grid,
  Snackbar,
  Box,
  ListItem,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
     
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = "O";
    squares[miniMax(squares)] = "X";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      
    });
  }



  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "move " + move : "Reset The Game ";
      return (
        <li
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "flex-end",
          }}
          key={move}
        >
          <Button
            style={{ marginBottom: "0.5rem" }}
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </Button>
        </li>
      );
    });

    let status;
    if (this.state.stepNumber == 0) {
      status = "The Game is Started";
    } else if (this.state.stepNumber == 9) {
      status = "The Game is Over Without Winner";
    } else if (winner) {
      status = "The Winner is " + winner;
    } else {
      status = "Your's Turn  ";
    }

    return (
      <Box bgcolor="rgb(255, 251, 251)">
        <Box marginBottom="1.2rem">
          <AppBar position="static" color="secondary">
            <Box m="1.5rem">
              <Grid container style={{ margin: "auto", width: "600px" }}>
                <Grid item xs={1}>
                  <Avatar
                    style={{ width: "60px", height: "50px" }}
                    alt="Remy Sharp"
                    variant="rounded"
                    src="https://lh3.googleusercontent.com/xv4-66b1Ot6YEUWoNZ5HDCLjWv9NkitxWEDvuwcHiWciBkLXiLH3OfvsH2EdPnNtl54"
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography
                    variant="h4"
                    align="center"
                    component="h1"
                    style={{ width: "100%" }}
                  >
                    Tic Tac Toe Game Application
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </AppBar>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "4.7rem",
                marginRight: "3.3rem",
              }}
              className="game-info"
            >
              <Alert severity="info">
                <AlertTitle>Game Situation</AlertTitle>
                <strong>{status}</strong>
              </Alert>
            </div>
            <div
              className="game"
              style={{
                display: "flex",
                height: "45vh",
                justifyContent: "flex-end",
                alignItems: "center",
                alignContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={3} style={{ marginTop: "5rem", marginRight: "1rem" }}>
            <ul>{moves}</ul>
          </Grid>
        </Grid>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function miniMax(gameMap, depth = 1, isMaximizingPlayer = true) {
  let winner = calculateWinner(gameMap);

  if (depth == 9 || winner)
    if (winner == "X") return 100 - depth;
    else if (winner == "O") return -100 + depth;
    else return 0;

  if (isMaximizingPlayer) {
    let bestVal = -Infinity;
    let bestMove = -1;
    for (const [i, move] of gameMap.entries()) {
      if (!move) {
        let newBoard = gameMap.slice();
        newBoard[i] = "X";
        let value = miniMax(newBoard, depth + 1, false);
        if (bestVal < value) {
          bestVal = value;
          bestMove = i;
        }
      }
    }

    return depth == 1 ? bestMove : bestVal;
  } else {
    let bestVal = +Infinity;
    for (const [i, move] of gameMap.entries()) {
      if (!move) {
        let newBoard = gameMap.slice();
        newBoard[i] = "O";
        let value = miniMax(newBoard, depth + 1, true);
        bestVal = Math.min(bestVal, value);
      }
    }

    return bestVal;
  }
}

export default Game;
