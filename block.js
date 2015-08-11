"use strict";

function Block(x, y) {
  this.position = { x: x, y: y};
  this.currentDirection = "down";
  this.stopped = false;
}

Block.prototype.move = function() {
  if (this.currentDirection == "down") {
    this.position.y++;
  } else if (this.currentDirection == "left") {
    this.position.x--;
  } else if (this.currentDirection == "right") {
    this.position.x++;
  }
};

Block.prototype.resetDirection = function() {
  this.currentDirection = "down";
}
