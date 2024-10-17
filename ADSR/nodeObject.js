class nodeObject {
  constructor(nodePos, radius, selectedRadius, locked, type) {
    this.nodePos = nodePos;
    this.nodeLocked = locked; // Makes it so node can't be moved by the mouse
    this.nodeColour = color(255, 204, 0);
    this.nodeSelectedColour = color(255, 255, 255, 80);
    this.nodeRadius = radius;
    this.nodeSelectedRadius = selectedRadius;
    this.nodeDrawSelected = false;
    this.type = type; // "node" or "handle"
    this.distance = -1; // holds the distance from this node to the current mouse position
    this.xMinPos = 0;
    this.yMinPos = 0;
    this.xMaxPos = 0;
    this.yMaxPos = 0;
  }

  drawNode() {
    if (this.nodeDrawSelected) {
      // Draw node and selected outline
      noStroke();
      fill(this.nodeSelectedColour);
      circle(this.nodePos.x, this.nodePos.y, this.nodeSelectedRadius);
    }
    if (this.type == "node") {
      fill(this.nodeColour);
      stroke(this.nodeColour);
      circle(this.nodePos.x, this.nodePos.y, this.nodeRadius);
    } else {
      noFill();
      stroke(this.nodeColour);
      circle(this.nodePos.x, this.nodePos.y, this.nodeRadius);
    }
  }

  setDrawNodeSelected(boolValue) {
    if (!this.nodeLocked) this.nodeDrawSelected = boolValue;
  }

  setNodePosition(positionVector) {
    
    this.nodePos = positionVector;
    
    if (positionVector.x < this.xMinPos)
      this.nodePos.x = this.xMinPos;
    
    if (positionVector.x > this.xMaxPos)
      {
        this.nodePos.x = this.xMaxPos;
      }
    
    if (positionVector.y < this.yMinPos)
      {
        this.nodePos.y = this.yMinPos;
      }
    
    if (positionVector.y > this.yMaxPos)
      {
        this.nodePos.y = this.yMaxPos;
      }
    
  }

  getNodePosition() {
    return this.nodePos;
  }

  getNodeLocked() {
    return this.nodeLocked;
  }

  setDistance(distance) {
    this.distance = distance;
  }

  getDistance() {
    return this.distance;
  }

  setXMinPos(position) {this.xMinPos = position;}

  setYMinPos(position) {this.yMinPos = position;}

  setXMaxPos(position) {this.xMaxPos = position;}

  setYMaxPos(position) {this.yMaxPos = position;}
}
