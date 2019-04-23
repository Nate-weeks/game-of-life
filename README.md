Game of Life
========
The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.

The rules for cell generation include:

* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Resources
=========
* [https://stackoverflow.com/questions/48710797/how-do-i-deep-clone-an-object-in-react](https://stackoverflow.com/questions/48710797/how-do-i-deep-clone-an-object-in-react)
* [https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

Deployment
=========
* Deployed to: [https://game-of-life-react-exam.herokuapp.com/](https://game-of-life-react-exam.herokuapp.com/)
* Deployed to heroku using the heroku create-react-app buildpack and the heroku command line tools:  [https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack](https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack)

Running Locally
==========
* clone the repo, npm start

```
git clone https://github.com/Nate-weeks/game-of-life.git
npm install
npm start
```

Implementation details
============

I considered implementing this in vanilla javascript/html but I find it easier to work with react these days for interactive javascript apps.  I used create-react-app for the ease of setup and made one rather monolithic App.js that has all my interactive pieces.  I created the 80 by 80 grid by building a 2 dimensional array which each element set to equal "off" with a set of for loops in the componentDidMount lifecycle method.  I then mapped through that array and returned a nested table with the requisite function to bind to the onClick and a classname based on their spot in the grid.

Implementing the rules for stepping forward and toggling based cell color based on clicks and based on the number of neighbors was pretty straightforward.  However, I encountered a bug when I tested for specific pattern functionality.  When I looked in the wiki article and realized that 3 in a row was suppose to jump back and forth and mine wasn't... it was quite the headache to debug.  I couldn't just print out the results of each countNeighbors function because it was mapping through 100 tiles.  I wound up shrinking the board to a 4x4 grid and putting in a lot of print statements that you see commented out.  It turns out that tempgrid was not a deep copy of this.state.grid, that is, I was passing it by reference, so when I went through the stepForward function, I was changing it one block at a time and then measuring in relation to things that were already changed.  Usually when you mutate state directly without using this.setState or some other state management library, react warns you.  Since I was mutating state indirectly by reference, and using this.setState at the end of the function, I was not warned and spent quite a while trying to find the bug.  I wound up using the lodash(the only external library I used in this project) to make a deep a copy as apparently there is no way to do so in react with vanilla javascript (I tried the spread operator and a few other things).
