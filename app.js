document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-btn')
  const width = 10

  const lShape= [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const  zShape = [
    [width*2, width+1, width*2+1, width+2],
    [0, width, width+1, width*2+1],
    [width*2, width+1, width*2+1, width+2],
    [0, width, width+1, width*2+1]
  ]

  const tShape = [
    [width, 1, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width*2+1, width+2],
    [width, 1, width+1, width*2+1]
  ]

  const sqShape = [
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1]
  ]

  const iShape = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]
  
  const theShapes = [lShape, zShape, tShape, sqShape, iShape]

  let currentPosition = 4
  let currentRotation = 0

  let random = Math.floor(Math.random()*theShapes.length)

  let current = theShapes[random][currentRotation]

  // add shape to div
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('shape')
    })
  }

  // remove shape from div
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('shape')
    })
  }

  // make shape move down each second
  timerId = setInterval(moveDown, 1000)

  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      random = Math.floor(Math.random() * theShapes.length)
      current = theShapes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }


})

