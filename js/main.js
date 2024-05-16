var canvas = document.getElementById("canvas1");
var canvasCtx = canvas.getContext("2d");

var canvasWrap = document.getElementById("canvas-wrap1");

let ellipseCentre = new Coords(1280 / 2, 100 + 720 / 2);

let semiMajorR = (1280 * 8) / 3;

let semiMinorR = (720 * 2) / 5;

let nPoints = 50;

let horizontalIndent = 2;

let phi = 0;

let rectangleIncrement = 0;

//let buildingHeights = GenerateRandomHeights(68, 250);
let buildings = GenerateBuildings(30, 60, 25); //
let buildingsB = GenerateBuildings(65, 70, 10);
let buildingsC = GenerateBuildings(95, 100, 4); //
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
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  DrawSunDisc(canvasCtx, ellipseCentre, "yellow", 100);
  DrawSunBars(canvasCtx, phase);
  if (phase < Math.PI / 2) {
    phase += 0.006;
  }

  DrawOccludingRectangle();

  DrawHorizontals(
    horizontalPoints,
    canvasCtx,
    ellipseCentre,
    semiMinorR,
    horizonHeight
  );

  DrawBuildings(
    canvasCtx,
    buildingsC,
    ellipseCentre,
    horizonHeight,
    semiMinorR,
    "#1a1e42C8",
    "slower"
  );
  DrawBuildings(
    canvasCtx,
    buildingsB,
    ellipseCentre,
    horizonHeight,
    semiMinorR,
    "#1a1349",
    "slow"
  );
  DrawBuildings(
    canvasCtx,
    buildings,
    ellipseCentre,
    horizonHeight,
    semiMinorR,
    "#190539",
    "regular"
  );
  phi += 0.0005;

  if (phi > Math.PI / nPoints) {
    phi = 0;
  }
  let nextPoints = GenerateEllipsePoints(semiMajorR, semiMinorR, nPoints, phi);
  DrawRays(nextPoints, canvasCtx, ellipseCentre, horizonHeight);

  requestAnimationFrame(animate);
}

// Start the animation
animate();
