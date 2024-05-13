var canvas = document.getElementById("canvas");
var canvasCtx = canvas.getContext("2d");

let ellipseCentre = new Coords(1280 / 2, 720 / 2);

let semiMajorR = (1280 * 8) / 3;

let semiMinorR = (720 * 2) / 5;

let nPoints = 60;

let horizontalIndent = 2;

const initialPoints = GenerateEllipsePoints(semiMajorR, semiMinorR, nPoints);

/**
 * @param horizonHeight horizonHeight is relative to the internal coordinate system of the ellipse, this maintains consistency with points and simplifies interpolation calculations
 */
let horizonHeight = initialPoints[horizontalIndent].y;

canvasCtx.fillStyle = "#000000";
canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
canvasCtx.strokeStyle = "magenta";
canvasCtx.lineWidth = 1;

DrawHorizontals(
  initialPoints,
  canvasCtx,
  ellipseCentre,
  semiMinorR,
  horizonHeight
);

DrawRays(initialPoints, canvasCtx, ellipseCentre, horizonHeight);
