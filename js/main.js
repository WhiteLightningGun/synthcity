var canvas = document.getElementById("canvas1");
var canvasCtx = canvas.getContext("2d");

var canvasWrap = document.getElementById("canvas-wrap1");

let ellipseCentre = new Coords(1280 / 2, 100 + 720 / 2);

let semiMajorR = (1280 * 8) / 3;

let semiMinorR = (720 * 2) / 5;

let nPoints = 50;

let horizontalIndent = 2;

let phi = 0;

//let buildingHeights = GenerateRandomHeights(68, 250);
let buildings = GenerateBuildings(48, 60); // 60 is good enough
console.log(buildings);
let phase = 0;

const initialPoints = GenerateEllipsePoints(
  semiMajorR,
  semiMinorR,
  nPoints,
  phi
);

const horizontalPoints = GenerateHorizontalPoints(semiMinorR, nPoints);

let horizonHeight = initialPoints[horizontalIndent].y;

canvasCtx.lineWidth = CalculateLineWidth(canvasWrap.offsetWidth);

function animate() {
  // Clear the canvas
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  // draw sun disc
  DrawSunDisc(canvasCtx, ellipseCentre, "magenta", 100);

  DrawOccludingRectangle();

  DrawHorizontals(
    horizontalPoints,
    canvasCtx,
    ellipseCentre,
    semiMinorR,
    horizonHeight
  );
  phi += 0.0005;

  if (phi > Math.PI / nPoints) {
    phi = 0;
  }
  /*DrawBuildings(
    canvasCtx,
    buildingHeights,
    ellipseCentre,
    horizonHeight,
    20,
    inc
  );
  */
  DrawBuildingsB(
    canvasCtx,
    buildings,
    ellipseCentre,
    horizonHeight,
    semiMinorR,
    phase
  );
  let nextPoints = GenerateEllipsePoints(semiMajorR, semiMinorR, nPoints, phi);
  DrawRays(nextPoints, canvasCtx, ellipseCentre, horizonHeight);

  //DrawUpperHorizontal(canvasCtx, ellipseCentre, horizonHeight);
  phase += 0.0001;
  if (phase > 2) {
    phase = 0;
  }
  requestAnimationFrame(animate);
}

// Start the animation
animate();
