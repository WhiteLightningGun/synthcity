var canvas = document.getElementById("canvas");
var canvasCtx = canvas.getContext("2d");

let ellipseCentre = new Coords(1280 / 2, 100 + 720 / 2);

let semiMajorR = (1280 * 8) / 3;

let semiMinorR = (720 * 2) / 5;

let nPoints = 50;

let horizontalIndent = 1;

let phi = 0;

const initialPoints = GenerateEllipsePoints(
  semiMajorR,
  semiMinorR,
  nPoints,
  phi
); // used to draw horizontal lines

/**
 * @param horizonHeight horizonHeight is relative to the internal coordinate system of the ellipse, this maintains consistency with points and simplifies interpolation calculations
 */
let horizonHeight = initialPoints[horizontalIndent].y;

function animate() {
  // Clear the canvas
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.fillStyle = "#000000";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  DrawHorizontals(
    initialPoints,
    canvasCtx,
    ellipseCentre,
    semiMinorR,
    horizonHeight
  );
  phi += 0.0005;

  if (phi > Math.PI / nPoints) {
    phi = 0;
  }
  let nextPoints = GenerateEllipsePoints(semiMajorR, semiMinorR, nPoints, phi);
  DrawRays(nextPoints, canvasCtx, ellipseCentre, horizonHeight);

  //draw uppermost horizontal
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, ellipseCentre.y + horizonHeight - 1);
  canvasCtx.lineTo(canvas.width, ellipseCentre.y + horizonHeight - 1);
  canvasCtx.stroke();
  // Draw your animation

  // Call the next frame
  requestAnimationFrame(animate);
}

// Start the animation
animate();
