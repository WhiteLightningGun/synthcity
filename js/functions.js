/**
 * Generates a set of perimeter points on an ellipse seperated by an even angular argument. This is used to generate the initial collection of points which can be used to characterise and draw the set of horizontal lines which will be static throughout the animation.
 *  Use the same arguments as RotatedEllipsePoints in order to prevent nonsensical results.
 * @param {number} semiMajor - The semi-major axis of the ellipse.
 * @param {number} semiMinor - The semi-minor axis of the ellipse.
 * @param {number} n - The number of points to generate.
 * @return {Array} An array of Coords objects representing points on the ellipse.
 */
function GenerateEllipsePoints(semiMajor, semiMinor, n) {
  let inc = Math.PI / n;
  let phi = 0;
  let res = [];

  while (phi < Math.PI && res.length < n) {
    res.push(new Coords(semiMajor * Math.cos(phi), semiMinor * Math.sin(phi)));
    phi += inc;
  }
  return res;
}

function RotatedEllipsePoints(semiMajor, semiMinor, n) {
  let inc = Math.PI / n;
  let phi = 0 + 0.01;

  let res = [];

  while (phi < Math.PI) {
    res.push(new Coords(semiMajor * Math.cos(phi), semiMinor * Math.sin(phi)));
    phi += inc;
  }

  return res;
}

/**
 * Takes the initially generated set of ellipse points and draws the appropriate horizontal lines on the canvas context.
 * @param {Array} points
 * @param {CanvasRenderingContext2D} canvasCtx
 * @param {Coords} canvasCenter
 * @param {number} semiMinorAxis
 * @param {number} indent clips the uppermost horizontal lines from being drawn, values from 0-5 are recommended
 */
function DrawHorizontals(
  points,
  canvasCtx,
  canvasCenter,
  semiMinorAxis,
  horizonHeight
) {
  canvasCtx.strokeStyle = "magenta";
  let midPhase = points.length / 2;
  for (let i = midPhase; i < points.length; i++) {
    let midPhasePoint = points[i];
    if (midPhasePoint.y <= semiMinorAxis - horizonHeight) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, canvasCenter.y + (-midPhasePoint.y + semiMinorAxis));
      canvasCtx.lineTo(
        canvas.width,
        canvasCenter.y + (-midPhasePoint.y + semiMinorAxis)
      );
      canvasCtx.stroke();
    }
  }
}

/**
 * Takes the initially generated set of ellipse points and draws the appropriate horizontal lines on the canvas context.
 * @param {Array} points
 * @param {CanvasRenderingContext2D} canvasCtx
 * @param {Coords} ellipseCentre
 * @param {number} horizonHeight is established early in the program via the "indent" variable, is used to determine where to stop drawing the line so that it intersects with the horizon
 */
function DrawRays(points, canvasCtx, ellipseCentre, horizonHeight) {
  console.log("DrawRays reports horizonHeight: " + horizonHeight);
  for (let i = 0; i < points.length; i++) {
    let point = points[i];

    let x2 = ellipseCentre.x + point.x;
    let y2 = ellipseCentre.y + point.y;

    let x1 = ellipseCentre.x;
    let y1 = ellipseCentre.y;

    let x = ((x2 - x1) / (y2 - y1)) * horizonHeight;

    canvasCtx.strokeStyle = "magenta";
    canvasCtx.beginPath();
    canvasCtx.moveTo(ellipseCentre.x + point.x, ellipseCentre.y + point.y);
    canvasCtx.lineTo(x + ellipseCentre.x, horizonHeight + ellipseCentre.y); // calculated from intersection point
    canvasCtx.stroke();
  }
}
