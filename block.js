"use strict";

function Block(type, initialX, initialY) {
  if (type === "O") {
    this.position = { x1: initialX, y1: initialY,
                      x2: initialX - 1, y2: initialY - 1,
                      x3: initialX - 1, y3: initialY,
                      x4: initialX, y4: initialY - 1 };
  } else if (type === "I") {
    this.position = { x1: initialX, y1: initialY,
                      x2: initialX, y2: initialY - 1,
                      x3: initialX, y3: initialY - 2,
                      x4: initialX, y4: initialY - 3 };
  } else if (type === "S") {
    this.position = { x1: initialX, y1: initialY,
                      x2: initialX, y2: initialY - 1,
                      x3: initialX + 1, y3: initialY - 1,
                      x4: initialX - 1, y4: initialY };
  }  else if (type === "Z") {
    this.position = { x1: initialX, y1: initialY,
                      x2: initialX, y2: initialY - 1,
                      x3: initialX - 1, y3: initialY - 1,
                      x4: initialX + 1, y4: initialY };
  }
  this.currentDirection = "down";
  this.stopped = false;
  this.kind = "O";
}

Block.prototype.render = function() {
  $("div[data-y='" + this.position.y1 + "'] div[data-x='" + this.position.x1 + "']").addClass('block');
  $("div[data-y='" + this.position.y2 + "'] div[data-x='" + this.position.x2 + "']").addClass('block');
  $("div[data-y='" + this.position.y3 + "'] div[data-x='" + this.position.x3 + "']").addClass('block');
  $("div[data-y='" + this.position.y4 + "'] div[data-x='" + this.position.x4 + "']").addClass('block');
};

Block.prototype.move = function() {
  if (this.currentDirection == "down") {
    this.position.y1++;
    this.position.y2++;
    this.position.y3++;
    this.position.y4++;
  } else if (this.currentDirection == "left") {
    if (!model.hitSide(this)) {
      this.position.x1--;
      this.position.x2--;
      this.position.x3--;
      this.position.x4--;
    }
  } else if (this.currentDirection == "right") {
    if (!model.hitSide(this)) {
      this.position.x1++;
      this.position.x2++;
      this.position.x3++;
      this.position.x4++;
    }
  }
};

Block.prototype.resetDirection = function() {
  this.currentDirection = "down";
};
