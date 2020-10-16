const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
const resetButton = document.querySelector('#reset')
const scoreDisplay = document.querySelector('#score')
const levelDisplay = document.querySelector('#level')

let width = 20
let level = 1
let score = 0

let squares = []
let snake
let snakeSpeed = 300
let snakeDirection
let newDirection
let snakeTimer

for (let i = 0; i < width * width; i++) {
   const div = document.createElement('div')
   squares.push(div)
   grid.appendChild(div)
}

function startSnake() {
   snakeTimer = setInterval(moveSnake , snakeSpeed)
}

function moveSnake() {
   let nextSquare = snake[0] + newDirection
   // Offgrid at the top
   if (nextSquare < 0) {
      nextSquare = squares.length - (width - snake[0])
   }
   // Off the bottom of the grid
   if (nextSquare > squares.length - 1) {
      nextSquare = snake[0] - (width * width) + width
   }
   // Off the right
   if (newDirection === 1 && nextSquare % width === 0) {
      nextSquare -= width
   }
   // Off the left
   if (newDirection === -1 && nextSquare % width === width - 1) {
      nextSquare += width
   }
   // Check for collision
   if (squares[nextSquare].classList.contains('snake')) {
      clearInterval(snakeTimer)
      snake.forEach(index => squares[index].classList.add('crash'))
   } else {
      snake.forEach(index => squares[index].classList.remove('snake'))
      squares[snake[0]].classList.remove(snakeDirectionClass(snakeDirection))
      snakeDirection = newDirection
      snake.unshift(nextSquare)
      if (squares[snake[0]].classList.contains('apple')) {
         squares[snake[0]].classList.remove('apple')
         updateScore()
         setTimeout(generateApple,300)
      } else {
         snake.pop()
      }
      drawSnake()
   }
}

function drawSnake() {
   snake.forEach(index => squares[index].classList.add('snake'))
   squares[snake[0]].classList.add(snakeDirectionClass(snakeDirection))
}

function updateScore() {
   score += 10
   scoreDisplay.textContent = `Score: ${score}`
   clearInterval(snakeTimer)
   startSnake()
   level ++
   if (snakeSpeed > 100) { snakeSpeed -= 5 }
   levelDisplay.textContent = `Level ${level}`
}

function startGame() {
   newDirection = snakeDirection
   startSnake()
   startButton.classList.add('hidden')
   pauseButton.classList.remove('hidden')
   resetButton.classList.remove('hidden')
   setTimeout(generateApple,1000)
}

function resetGame() {
   clearInterval(snakeTimer)
   for (let square of squares) {
      square.classList = 'square'
   }
   startButton.classList.remove('hidden')
   pauseButton.classList.add('hidden')
   resetButton.classList.add('hidden')
   snakeDirection = 1
   newDirection = 1
   snake = [width * width / 2 + width / 2, width * width / 2 + width / 2 - 1]
   drawSnake()
   score = 0
}

function pauseGame() {
   clearInterval(snakeTimer)
   startButton.classList.remove('hidden')
   pauseButton.classList.add('hidden')
}

function snakeDirectionClass() {
   switch (snakeDirection) {
      case -width:
         return 'snake-head-top'
      break;
      case 1:
         return 'snake-head-right'
      break;
      case width:
         return 'snake-head-bottom'
      break;
      case -1:
         return 'snake-head-left'
      break;
   }
}

function generateApple() {
   const appleSquare = Math.floor(Math.random() * squares.length)
   if (squares[appleSquare].classList.contains('snake') ||
      squares[appleSquare].classList.contains('block')) {
         generateApple()
      } else {
         squares[appleSquare].classList.add('apple')
      }
}

// Listen for key down
document.addEventListener("keydown", (e) => {
   e = e || window.event
   switch (e.keyCode) {
      case 32: // space bar
         startGame()
      break;
      case 38: // up
      if (snakeDirection !== width) {
         newDirection = -width
      }
      break;
      case 39:  // right
      if (snakeDirection !== -1) {
         newDirection = 1
      }
      break;
      case 40: // down
      if (snakeDirection !== -width) {
         newDirection = width
      }
      break;
      case 37: // left
      if (snakeDirection !== 1) {
         newDirection = -1
      }
      break;
   }
})

startButton.addEventListener('click', startGame)
pauseButton.addEventListener('click', pauseGame)
resetButton.addEventListener('click', resetGame)
resetGame()
