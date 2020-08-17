document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-btn");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const colors = ["blue", "purple", "orange", "red", "grey"];

  const lShape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zShape = [
    [width * 2, width + 1, width * 2 + 1, width + 2],
    [0, width, width + 1, width * 2 + 1],
    [width * 2, width + 1, width * 2 + 1, width + 2],
    [0, width, width + 1, width * 2 + 1],
  ];

  const tShape = [
    [width, 1, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width + 2],
    [width, 1, width + 1, width * 2 + 1],
  ];

  const sqShape = [
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
    [0, width, 1, width + 1],
  ];

  const iShape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theShapes = [lShape, zShape, tShape, sqShape, iShape];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * theShapes.length);

  let current = theShapes[random][currentRotation];

  // add shape to div
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("shape");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  // remove shape from div
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("shape");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  // make shape move down each second
  // timerId = setInterval(moveDown, 1000);

  // assign functions to keycodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }

  document.addEventListener("keyup", control);

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theShapes.length);
      current = theShapes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  function moveLeft() {
    undraw();
    const atLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!atLeftEdge) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const atRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!atRightEdge) currentPosition += 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;

    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theShapes[random][currentRotation];
    draw();
  }

  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  const displayIndex = 0;

  const shapeUpNext = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [
      displayWidth * 2,
      displayWidth + 1,
      displayWidth * 2 + 1,
      displayWidth + 2,
    ],
    [displayWidth, 1, displayWidth + 1, displayWidth + 2],
    [0, displayWidth, 1, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("shape");
      square.style.backgroundColor = "";
    });
    shapeUpNext[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("shape");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[nextRandom];
    });
  }

  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 200);
      nextRandom = Math.floor(Math.random() * theShapes.length);
      displayShape();
    }
  });

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("shape");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "end";
      clearInterval(timerId);
    }
  }
});
