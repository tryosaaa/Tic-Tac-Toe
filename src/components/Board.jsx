import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import {Button ,Grid} from '@material-ui/core';



            
       function Square(props) {
            return (
              <Box mb={3}>
                <Button size="large" variant="outlined" color="secondary" className="square" onClick={props.onClick} >
                {props.value}
                </Button>
              </Box>
            );
        }
    
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i] || "⠀"}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <Grid container spacing={3} style={{margin:'auto',width:'300px'}}>
           <Grid item xs={4}>
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </Grid>
            <Grid item xs={4}>
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </Grid>
            <Grid item xs={4}>
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
          </Grid>
        </Grid>
      );
    }
  }

export default Board;
