window.onload = () => {
  const screen = document.getElementById("screen");
  const context = screen.getContext("2d");
  document.addEventListener("keydown", keyPush);
  const textScore = document.getElementById("score");

  setInterval(loop, 80);
  const pixel = 20; // Tamanho de 1 Pixel
  const lengthScreen = pixel; // Tamanho máximo

  let direction = {
    X: 0,
    Y: 0
  };

  //Coordenadas de cada elemento

  let apple = {
    X: 4,
    Y: 15
  };

  let snake = {
    X: 10,
    Y: 15
  };

  let trails = [
    {
      X: 0,
      y: 0
    }
  ];
  let tail = 8;

  function loop() {
    calculateSnakePosition();
    renderWorld();
  }

  function calculateSnakePosition() {
    snake.X = snake.X + direction.X;
    snake.Y = snake.Y + direction.Y;

    if (snake.X < 0) {
      snake.X = lengthScreen - 1;
    } else if (snake.X > lengthScreen - 1) {
      snake.X = 0;
    } else if (snake.Y < 0) {
      snake.Y = lengthScreen - 1;
    } else if (snake.Y > lengthScreen - 1) {
      snake.Y = 0;
    }
  }

  function renderWorld() {
    context.fillStyle = "black";
    context.fillRect(0, 0, screen.width, screen.height);

    context.fillStyle = "red";
    context.fillRect(apple.X * pixel, apple.Y * pixel, pixel, pixel);

    context.fillStyle = "green";

    trails.map(trail => {
      context.fillRect(trail.X * pixel, trail.Y * pixel, pixel - 1, pixel - 1);
      if (trail.X == snake.X && trail.Y == snake.Y) {
        direction.X = direction.Y = 0;
        tail = 1;
        textScore.textContent = tail - 1;
      }
    });

    trails.push({ X: snake.X, Y: snake.Y });

    while (trails.length > tail) {
      trails.shift();
    }

    if (apple.X == snake.X && apple.Y == snake.Y) {
      tail++;
      textScore.textContent = trails.length;

      apple.X = Math.floor(Math.random() * lengthScreen);
      apple.Y = Math.floor(Math.random() * lengthScreen);
    }
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // Esquerda
        direction.X = -1;
        direction.Y = 0;
        break;
      case 38: // Cima
        direction.X = 0;
        direction.Y = -1;
        break;
      case 39: // Direita
        direction.X = 1;
        direction.Y = 0;
        break;
      case 40: // Baixo
        direction.X = 0;
        direction.Y = 1;
        break;
      default:
        break;
    }
  }
};
