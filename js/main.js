var canvas = document.getElementById("canvas");
var canvasCtx = canvas.getContext("2d");

let ellipseCentre = new Coords(1280 / 2, 100 + 720 / 2);

let semiMajorR = (1280 * 8) / 3;

let semiMinorR = (720 * 2) / 5;

let nPoints = 50;

let horizontalIndent = 1;

const initialPoints = GenerateEllipsePoints(semiMajorR, semiMinorR, nPoints);

/**
 * @param horizonHeight horizonHeight is relative to the internal coordinate system of the ellipse, this maintains consistency with points and simplifies interpolation calculations
 */
let horizonHeight = initialPoints[horizontalIndent].y;

canvasCtx.fillStyle = "#000000";
canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
canvasCtx.strokeStyle = "magenta";
canvasCtx.lineWidth = 1;

canvasCtx.strokeStyle = "magenta";
canvasCtx.beginPath();
canvasCtx.moveTo(0, ellipseCentre.y + horizonHeight - 1);
canvasCtx.lineTo(canvas.width, ellipseCentre.y + horizonHeight - 1);
canvasCtx.stroke();

DrawHorizontals(
  initialPoints,
  canvasCtx,
  ellipseCentre,
  semiMinorR,
  horizonHeight
);

DrawRays(initialPoints, canvasCtx, ellipseCentre, horizonHeight);
