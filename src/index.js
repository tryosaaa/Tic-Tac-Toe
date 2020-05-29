import React from "react"
import ReactDom, { render } from "react-dom"
import Game from "./components/Game"
import {Grid } from '@material-ui/core';


import "bootstrap/dist/css/bootstrap.css"


ReactDom.render(<Game />, document.getElementById("root"));
