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

  let random = Math.floor(Math.random()*theShapes.length)

  let current = theShapes[0][0]


  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('shape')
    })
  }

  draw()

})

