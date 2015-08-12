// use === instead of ==

"use strict";

var view = {
  init: function(block) {
    this.attachDirListener(block);
    view.render();
  },

  render: function() {
    this.clearField();
    this.drawBoard();
    var totalScore = model.getScore();
    $("#score").text(totalScore);
    this.drawBlocks();
  },

  clearField: function() {
    $('#tetris-grid').html("");
  },

  drawBoard: function() {
    for (var i = 1; i <= model.gridSize; i++) {
      this.addRowsCols($("#tetris-grid"), 10, i);
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

  drawBlocks: function() {
    model.blocks.forEach(function(block){

      if (!block.stopped) {
        block.move();
      }

      block.resetDirection();
      block.render();
    });
  },

  attachDirListener: function(block){
    $(window).keydown(function(press) {
      if (press.which === 37) {
         block.currentDirection = "left";
      } else if (press.which === 39) {
         block.currentDirection = "right";
      }
    });
  }
};

var model = {

  currentBlock: new Block("O", 5, 2),
  blockTypes: ["O", "I", "S", "Z"],

  blocks: [],

  gridSize: 20,
  totalScore: 0,

  getScore: function() {
    return this.totalScore;
  },

  hitBottom: function(block) {
    return (Math.abs(block.position.y1) >= model.gridSize);
  },

  hitBlock: function(block) {
    return $("div[data-y='" + (block.position.y1 + 1) + "'] div[data-x='" + block.position.x1 + "']").hasClass('block') ||
           $("div[data-y='" + (block.position.y1 + 1) + "'] div[data-x='" + block.position.x2 + "']").hasClass('block');
  },

  hitSide: function(block) {
    return( block.position.x1 >= 10 ||
            block.position.x3 <= 1);
  }
};

var controller = {

  // create a gameloop var, look how to set setInterval time
  init: function() {
    model.blocks.push(model.currentBlock);

    setInterval(function() {
      controller.gameLoop();
    }, 100);
  },

  gameLoop: function() {
    if (model.hitBottom(model.currentBlock) || model.hitBlock(model.currentBlock)) {
      model.currentBlock.stopped = true;
      if (this.rowIsFull(model.currentBlock)) {
        controller.clearRow(model.currentBlock);
        controller.shiftDown();
      }
      model.currentBlock = new Block(model.blockTypes[Math.floor(Math.random() * model.blockTypes.length)], Math.floor((Math.random() * 10 ) + 1), 1);
      model.blocks.push(model.currentBlock);
      view.init(model.currentBlock);
    } else {
      view.init(model.currentBlock);
    }
  },

  setCurrentDirection: function(dir) {
    model.currentDirection = dir;
  },

  rowIsFull: function(block) {
    return ($(".row[data-y=" + block.position.y1 + "]").children().not('.block').length === 0);
  },

  clearRow: function(block) {
    model.blocks = model.blocks.filter(function(el) {
      return el.position.y1 !== 20;
    });
  },

  shiftDown: function() {
    model.blocks.forEach(function(block) {
      block.position.y1++;
      block.position.y2++;
      block.position.y3++;
      block.position.y4++;
    });
    // should maybe be in the view
  }
};

$(document).ready(function() {
  controller.init();
});
