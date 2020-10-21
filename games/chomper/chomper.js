for ( let row = 0; row < maze.length; row++ ) {
   for (const column in maze[row]) {
      if (maze[row][column] === 2) {
         const gridArea = parseInt(row) + '/' + parseInt(column - 1) + '/' + parseInt(row + 2) + '/' + parseInt(parseInt(column,10) + 1)
         const square = document.createElement('div')
         square.style['grid-area'] = gridArea
         square.classList.add('pellet')
         board.appendChild(square)
      }
      if (maze[row][column] === 3) {
         const gridArea = parseInt(row) + '/' + parseInt(column - 1) + '/' + parseInt(row + 2) + '/' + parseInt(parseInt(column,10) + 1)
         const square = document.createElement('div')
         square.style['grid-area'] = gridArea
         square.classList.add('booster')
         board.appendChild(square)
      }
   }
}

for ( let row = 0; row < walls.length; row++ ) {
   const gridArea = walls[row].r + '/' + walls[row].c + '/' + parseInt(walls[row].r + walls[row].h) + '/' + parseInt(walls[row].c + walls[row].w)
   const square = document.createElement('div')
   square.style['grid-area'] = gridArea
   for ( let classes = 0; classes < walls[row].s.length; classes++) {
      square.classList.add(walls[row].s[classes])
   }
   board.appendChild(square)
}

for (const token in tokens) {
   const div = document.createElement('div')
   div.style['grid-area'] = tokenGrid(tokens[token].row,tokens[token].col)
   div.classList.add('token')
   const span = document.createElement('span')
   span.style['background-color'] = tokens[token].color
   span.classList.add(tokens[token].class)
   div.appendChild(span)
   tokens[token].div = div
   board.appendChild(tokens[token].div)
}

function tokenGrid(row,col) {
   const startR = row - 2
   const startC = col - 2
   const endR = row + 2
   const endC = col + 2
   return `${startR} / ${startC} / ${endR} / ${endC}`
}

// Move the ghosts: rosy, rob, rover, and plum
function startGame() {
   launchChomper()
   launchRosy()
   setTimeout(launchRover(),1000)

}

function launchRosy() {
   const startMoves = [3,3,3,0,0,0,0,0,0,3,3,3,3,3,3,0]
   let index = 0
      const moveRosy = setInterval(function() {
         if (index < startMoves.length) {
            moveGhost(tokens['rosy'],startMoves[index])
            index++
         } else {
            clearInterval(moveRosy)
            nextMove(tokens['rosy'],0)
         }
      }, tokens['rosy'].speed)
}

function nextMove(token,direction) {
   // Move the token until it reaches a wall for now
   // change direction to chase for future algorithm
   const moveName = token['name']
   token.interval = setInterval(function() {
      const moveStatus = moveGhost(token,direction)
      if (!moveStatus) {
         clearInterval(token.interval)
         turnMove(token,direction)
      }
   }, token['speed'])
   moveGhost(token,direction)
}

function turnMove(token,direction) {
   // Turn the token in a new direction: First, 90 degree; When chasing, reverse possible

}

function moveGhost(token, direction) {
   switch (direction) {
      case 0: // up
         if (maze[token.row - 1 - 1][token.col]) {
            // Update the token row
            token.row --
            drawToken(token)
            return true
         }
      break;
      case 1:  // right
         if (maze[token.row - 1][token.col + 1]) {
            // Update the token column
            token.col ++
            drawToken(token)
            return true
         }
      break;
      case 2: // down
         if (maze[token.row - 1 + 1][token.col]) {
            // Update the token column
            token.row ++
            drawToken(token)
            return true
         }
      break;
      case 3: // left
         if (maze[token.row - 1][token.col - 1]) {
            // Update the token column
            token.col --
            drawToken(token)
            return true
         }
      break;
   }
   return false
}

function drawToken(token) {
   const gridArea = tokenGrid(token.row,token.col)
   token.div.style['grid-area'] = gridArea
}

let moveChomperTimer
function moveChomper(x,y) {
   console.log(x,y)
   return
   if (maze[chomp.position.row + y - 1] && maze[chomp.position.row + y - 1][chomp.position.col + x]) {
      clearTimeout(moveChomperTimer)
      chomp.position.col += x
      chomp.position.row += y
      chomp.position.l += x
      chomp.position.r += x
      chomp.position.t += y
      chomp.position.b += y
      chomper.style['grid-area'] = chomp.position.t + '/' + chomp.position.l + '/' + chomp.position.b + '/' + chomp.position.r
      moveChomperTimer = setTimeout(function() { moveChomper(x,y) },200)
   }
}

// Listen for key down
document.addEventListener("keydown", (e) => {
   e = e || window.event
   switch (e.keyCode) {
      case 38: // up
         moveChomper(0,-1)
      break;
      case 39:  // right
         moveChomper(1,0)
      break;
      case 40: // down
         moveChomper(0,1)
      break;
      case 37: // left
         moveChomper(-1,0)
      break;
   }
})
