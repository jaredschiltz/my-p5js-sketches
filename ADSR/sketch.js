let nodeArray = [];
const nodeRadius = 5;
const nodeSelectedRadius = nodeRadius * 3;
let currentNode = -1; // -1 if current node is not valid, otherwise current node number
let canMove = false;

function setup() {
  canvas = createCanvas(400, 200);
  nodeArray.push(
    new nodeObject(
      createVector(0 + nodeRadius, height - nodeRadius),
      nodeRadius,
      nodeSelectedRadius,
      true,
      "node"
    )
  );
  nodeArray.push(
    new nodeObject(
      createVector(width / 8, 0 + nodeRadius),
      nodeRadius,
      nodeSelectedRadius,
      false,
      "node"
    )
  );

  nodeArray.push(
    new nodeObject(
      createVector(
        nodeArray[0].getNodePosition().x +
          abs(
            (nodeArray[1].getNodePosition().x -
              nodeArray[0].getNodePosition().x) /
              2
          ),
        nodeArray[1].getNodePosition().y +
          abs(
            (nodeArray[1].getNodePosition().y -
              nodeArray[0].getNodePosition().y) /
              2
          )
      ),
      nodeRadius,
      nodeSelectedRadius,
      false,
      "handle"
    )
  );

  nodeArray.push(
    new nodeObject(
      createVector(width / 3, 0 + height / 3),
      nodeRadius,
      nodeSelectedRadius,
      false,
      "node"
    )
  );

  // nodeArray.push(new nodeObject(width / 2, height / 2, nodeRadius, false));
  // nodeArray.push(new nodeObject(width - nodeRadius, height - nodeRadius, nodeRadius, false));

  // Set initial node position parameters
  
  nodeArray[0].setXMinPos(nodeRadius);
  nodeArray[0].setXMaxPos(nodeRadius);
  nodeArray[0].setYMinPos(height - nodeRadius);
  nodeArray[0].setYMaxPos(height - nodeRadius);
  
  nodeArray[1].setXMinPos(nodeRadius + 1); // Add 1 so that slope is not infinite
  nodeArray[1].setXMaxPos(width - nodeRadius);
  nodeArray[1].setYMinPos(nodeRadius);
  nodeArray[1].setYMaxPos(nodeRadius);

  nodeArray[2].setXMinPos(nodeRadius + 1);
  nodeArray[2].setXMaxPos(nodeArray[1].getNodePosition().x - 1);
  nodeArray[2].setYMinPos(nodeRadius);
  nodeArray[2].setYMaxPos(height - nodeRadius);
}

function draw() {
  background(0);

  // Calculate distances between the mouse and each node and find the smallest one
  // Searching from node 0, node 1, ... to node N.
  // This implies priority; e.g., if node1 and node2 were the same, node 1 would hold smallest distance
  let smallestDistance = Number.MAX_VALUE;
  let smallestNode = Number.MAX_VALUE;
  for (let i = 0; i < nodeArray.length; i++) {
    nodeArray[i].setDistance(
      dist(
        mouseX,
        mouseY,
        nodeArray[i].getNodePosition().x,
        nodeArray[i].getNodePosition().y
      )
    );
    if (!nodeArray[i].getNodeLocked()) {
      // skip over locked nodes
      if (nodeArray[i].getDistance() < smallestDistance) {
        smallestDistance = nodeArray[i].getDistance();
        smallestNode = i;
      }
    }
  }

  if (!canMove) {
    for (let i = 0; i < nodeArray.length; i++) {
      nodeArray[i].setDrawNodeSelected(false);
    }

    if (nodeArray[smallestNode].getDistance() < nodeSelectedRadius) {
      currentNode = smallestNode;
      nodeArray[smallestNode].setDrawNodeSelected(true);
    } else {
      currentNode = -1;
      nodeArray[smallestNode].setDrawNodeSelected(false);
    }
  }

  for (let i = 0; i < nodeArray.length; i++) {
    nodeArray[i].drawNode();
  }

  line(
    nodeArray[0].getNodePosition().x,
    nodeArray[0].getNodePosition().y,
    nodeArray[1].getNodePosition().x,
    nodeArray[1].getNodePosition().y
  );
}

function mousePressed() {
  if (currentNode != -1) {
    canMove = true;
  }
}

function mouseReleased() {
  canMove = false;
}

function mouseDragged() {
  if (canMove) {
    nodeArray[currentNode].setNodePosition(createVector(mouseX, mouseY));
  }
}
