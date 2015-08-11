// use === instead of ==

"use strict";

var view = {
  init: function() {
    this.attachDirListener();
    view.render();
  },

  render: function() {
    this.clearField();
    this.drawBoard();
    var totalScore = model.getScore();
    $("#score").text(totalScore);
    this.drawSnake(model.getCurrentDirection());
  },

  clearField: function() {
    $('#tetris-grid').html("");
  },

  drawBoard: function() {
    for (var i = 1; i <= model.gridSize; i++) {
      this.addRowsCols($("#tetris-grid"), model.gridSize, i);
    }
  },

  addRowsCols: function(board, numColumns, rowVal) {
    board.append("<div class='row'" + " data-y=" + rowVal + "></div>");
    for (var i = 1; i <= numColumns; i++) {
      $("#tetris-grid .row").last().append("<div class='col'" +
                                          " data-x=" +
                                          i +
                                          "></div>");
    }
  },

  drawSnake: function(direction) {

    model.makeMove(direction);
    controller.setCurrentDirection("down");

    $("div[data-y='" + model.snakeHead.y + "'] div[data-x='" + model.snakeHead.x + "']").addClass('block');

  },

  attachDirListener: function(){
    $(window).keydown(function(press) {
      if (press.which === 37) {
         controller.setCurrentDirection("left");
      } else if (press.which === 39) {
         controller.setCurrentDirection("right");
      }
    });
  }
};

var model = {

  snakeHead: {
    x: 1,
    y: 1
  },

  currentDirection: "down",

  gridSize: 10,
  totalScore: 0,

  moveDown: function() {
    this.snakeHead.y++;
  },

  moveLeft: function() {
    this.snakeHead.x--;
  },

  moveRight: function() {
    this.snakeHead.x++;
  },

  makeMove: function(direction) {
    if (direction == "down") {
      this.moveDown();
    } else if (direction == "left") {
      this.moveLeft();
    } else if (direction == "right") {
      this.moveRight();
    }
  },

  getScore: function() {
    return this.totalScore;
  },

  getCurrentDirection: function() {
    return this.currentDirection;
  },

  getSnakeX: function() {
    return this.snakeHead.x;
  },

  getSnakeY: function() {
    return this.snakeHead.y;
  },

  hitWall: function() {
    return (model.snakeHead.x > model.gridSize ||
            model.snakeHead.x < 1 ||
            model.snakeHead.y < 1 ||
            Math.abs(model.snakeHead.y) >= model.gridSize);
  }
};

var controller = {

  // create a gameloop var, look how to set setInterval time
  init: function() {
    setInterval(function() {
      if (model.hitWall()) {
        console.log("hit wall");
      } else
        view.init();
    }, 1500);
    // setInterval(function() {
    //   if (model.hitWall()) {
    //     console.log("u ded");
    //   } else {
    //     view.init();
    //   }
    // }, 500);
  },

  setCurrentDirection: function(dir) {
    model.currentDirection = dir;
  }
};

$(document).ready(function() {
  controller.init();
});
