import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GridTile from './GridTile';
import cloneDeep from 'lodash/cloneDeep';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      grid: []
    }
    this.selectTile = this.selectTile.bind(this)
    this.countNeighbors = this.countNeighbors.bind(this)
    this.stepForward = this.stepForward.bind(this)
    this.handleStep = this.handleStep.bind(this)
    this.doThing = this.doThing.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.clear = this.clear.bind(this)
  }
  //lifecycle method to build the initial grid
  componentDidMount(){
    const gridTemplate = [[]]
    for(let x=0;x<80;x++){
      gridTemplate[x] = []
      for(let y=0;y<80;y++){
        gridTemplate[x].push("off")
      }
    }
    this.setState({
      grid: gridTemplate
    })
  }

// method passed to each tile that set's the space in the grid to "on"
  selectTile(x, y){
    let tempgrid = cloneDeep(this.state.grid)
    if(tempgrid[x][y] === "off"){
      tempgrid[x][y] = "on"
    } else {
      tempgrid[x][y] = "off"
    }
    // console.log(`x = ${x}`)
    // console.log(`y = ${y}`)
    this.setState({
      grid: tempgrid
    })
    // console.log(this.state.grid)
  }

// helper method to check if a specific grid tile is set to "on"
  doThing(x,y){
    if(x>=0 && y>=0 && x<80 && y<80){
      if(this.state.grid[x][y] === "on"){
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

// counts neighboring tiles to see how many are switched on
  countNeighbors(x, y){
    let count = 0
    if(this.doThing(x-1,y-1)){count++};
    if(this.doThing(x,y-1)){count++};
    if(this.doThing(x+1,y-1)){count++};
    if(this.doThing(x-1,y)){count++};
    if(this.doThing(x+1,y)){count++};
    if(this.doThing(x-1,y+1)){count++};
    if(this.doThing(x,y+1)){count++};
    if(this.doThing(x+1,y+1)){count++};
    return count
  }

// determines which cells turn on and off based on neighbor count
  stepForward(){
    let tempgrid = cloneDeep(this.state.grid)
    for(let x=0;x<80;x++){
      for(let y=0;y<80;y++){
        let neighbors = this.countNeighbors(x, y)

        if(neighbors === 3 && tempgrid[x][y] === "off"){
          tempgrid[x][y] = "on"
          // console.log(`3 neighbors: x = ${x} y = ${y}`)
        }
        if(neighbors < 2 && tempgrid[x][y] === "on") {
          tempgrid[x][y] = "off"
          // console.log(`< 2 neighbors: x = ${x} y = ${y}`)
        }
        if(neighbors > 3 && tempgrid[x][y] === "on") {
          tempgrid[x][y] = "off"
          // console.log(`> 3 neighbors: x = ${x} y = ${y}`)
        }
      }
    }
    this.setState({
      grid: tempgrid
    })
    // console.log(this.state.grid)
  }

// passed to button to take a step forward
  handleStep(event){
    event.preventDefault();
    this.stepForward();
  }

// set a time interval to continuously step forward after .3 secs
  play(){
    this.interval = setInterval(this.stepForward, 200);
  }

// remove the time interval
  stop(){
    clearInterval(this.interval)
  }

// button to reset the board
  clear(){
    const gridTemplate = [[]]
    for(let x=0;x<80;x++){
      gridTemplate[x] = []
      for(let y=0;y<80;y++){
        gridTemplate[x].push("off")
      }
    }
    this.setState({
      grid: gridTemplate
    })
  }

  render() {
    // map that returns a nested grid of tiles and passes them a classname and function
    // that toggles the classname between "on" and "off"
    let tiles = this.state.grid.map((tile, x) => {
      return (
        <tr key = {x}>
        {tile.map((point, y) => {
          let handleClick = () => {
            this.selectTile(x, y)
          }
          return (
            <GridTile key = {y}
            className = {point}
            handleClick = {handleClick}/>
          )
        })}
        </tr>
      )
    })
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <button onClick={this.handleStep}>step</button>
        <button onClick={this.play}>play</button>
        <button onClick={this.stop}>stop</button>
        <button onClick={this.clear}>clear</button>
        <table>
          <tbody>
            {tiles}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
