/**
 * Generates a set of perimeter points on an ellipse seperated by an even angular argument. This is used to generate the initial collection of points which can be used to characterise and draw the set of horizontal lines which will be static throughout the animation.
 *  Use the same arguments as RotatedEllipsePoints in order to prevent nonsensical results.
 * @param {number} semiMajor - The semi-major axis of the ellipse.
 * @param {number} semiMinor - The semi-minor axis of the ellipse.
 * @param {number} n - The number of points to generate.
 * @return {Array} An array of Coords objects representing points on the ellipse.
 */
function GenerateEllipsePoints(semiMajor, semiMinor, n, phi) {
  let inc = Math.PI / n;
  let res = [];

  while (phi < Math.PI && res.length < n) {
    res.push(new Coords(semiMajor * Math.cos(phi), semiMinor * Math.sin(phi)));
    phi += inc;
  }
  return res;
}

function GenerateHorizontalPoints(semiMinor, n, phi = 0) {
  let inc = (2 * Math.PI) / n;
  let res = [];
  let halfN = Math.floor(n / 2);
  while (phi < Math.PI && res.length < halfN) {
    res.push(semiMinor * Math.cos(phi));
    phi += inc;
  }
  return res;
}

/**
 * Works with the single dimensional array produced by GenerateHorizontalPoints()
 * @param {Array} points
 * @param {CanvasRenderingContext2D} canvasCtx
 * @param {Coords} canvasCenter
 * @param {number} semiMinorAxis
 */
function DrawHorizontals(
  points,
  canvasCtx,
  canvasCenter,
  semiMinorAxis,
  horizonHeight
) {
  canvasCtx.strokeStyle = "magenta";
  for (let i = 0; i < points.length; i++) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(
      0,
      canvasCenter.y + (-points[i] + semiMinorAxis + horizonHeight)
    );
    canvasCtx.lineTo(
      canvas.width,
      canvasCenter.y + (-points[i] + semiMinorAxis + horizonHeight)
    );
    canvasCtx.stroke();
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

/**
 * Used to Calculates line thickness used by canvas context inversely proportional on div size and by extension screen size.
 * @param {*} divSize
 * @returns
 */
function CalculateLineWidth(divSize) {
  //greater than 600 = 1 and less than 300 equal =3 with straigtline interpolation between

  if (divSize > 600) {
    return 1;
  } else if (divSize < 300) {
    return 4;
  } else {
    let newWidth = -0.01 * divSize + 7;
    return newWidth;
  }
}

/**
 *
 * @param {*} ellipseCentre Coords object that contains x y position of ellipse centre, the proverbial vanishing point of the entire image
 * @param {*} horizonHeight integer value marking where the location of the horizon line on the y direction
 */
function DrawUpperHorizontal(canvasCtx, ellipseCentre, horizonHeight) {
  canvasCtx.beginPath();
  canvasCtx.moveTo(0, ellipseCentre.y + horizonHeight - 1);
  canvasCtx.lineTo(canvas.width, ellipseCentre.y + horizonHeight - 1);
  canvasCtx.stroke();
}

function DrawSunDisc(
  canvasCtx,
  ellipseCentre,
  outlineColour = "yellow",
  radius = 130,
  fillColour = "#FFFF00FF"
) {
  canvasCtx.strokeStyle = outlineColour;
  canvasCtx.beginPath();
  canvasCtx.arc(ellipseCentre.x, ellipseCentre.y / 2, radius, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
  canvasCtx.stroke();
  canvasCtx.fillStyle = fillColour; // #FFFF0008 is the mysterious black sun setting
  canvasCtx.fill(); // Fill the circle
}

/**
 * create translucent black rectangle up to horizon level
 */
function DrawOccludingRectangle() {
  canvasCtx.fillStyle = "#00000090";
  canvasCtx.fillRect(
    0,
    canvas.height + 1.72 * horizonHeight - semiMinorR + 2,
    canvas.width,
    canvas.height
  );
}

function GenerateRandomHeights(maxHeight = 50, count = 60) {
  var randomNumbers = [];
  for (var i = 0; i < count; i++) {
    let rand = Math.round(Math.random() * 20) * 0.05;
    rand = rand > 0.9 ? rand + 0.2 : rand;
    rand = rand < 0.1 ? rand + 0.2 : rand;
    let nextNumber = maxHeight * rand;
    randomNumbers.push(nextNumber);
  }
  return randomNumbers;
}

/**
 *
 * @param {number} maxHeight
 * @param {number} count
 * @param {number} maxWidth
 * @returns
 */
function GenerateBuildings(maxHeight = 50, count = 60, maxWidth = 18) {
  let res = [];
  let randomHeights = GenerateRandomHeights(maxHeight, count);
  for (var i = 0; i < count; i++) {
    let gap = Math.random() * maxWidth * 6;
    let posX = i / count - 0.5;
    let newWidth = maxWidth - maxWidth / 3 + (Math.random() * maxWidth) / 3;
    let newBuilding = new Building(newWidth, randomHeights[i], gap, posX);
    res.push(newBuilding);
  }
  return res;
}

function DrawBuildings(
  canvasCtx,
  buildings,
  ellipseCentre,
  horizonHeight,
  semiMinorAxis,
  colour = "#1b053d",
  speed
) {
  //**Each building in array should have ability to scale itself according to a position argument given in this function */
  canvasCtx.fillStyle = colour; // "#230750"; //"#000000CD";
  for (let i = 0; i < buildings.length; i++) {
    canvasCtx.fillRect(
      buildings[i].getPosXAdjusted() * 7 * semiMinorAxis + canvas.width / 2,
      ellipseCentre.y + horizonHeight - buildings[i].getHeight(),
      buildings[i].getWidthPlusGap(),
      buildings[i].getHeight()
    );
    buildings[i].Update(speed);
  }
}

function DrawSunBars(canvasCtx, phase) {
  canvasCtx.fillStyle = "#000000";
  canvasCtx.fillRect(
    canvas.width / 2 - 105,
    -40 + canvas.height / 3,
    210,
    15 * Math.sin(phase) + 1
  );
  canvasCtx.fillRect(
    canvas.width / 2 - 105,
    -1 + canvas.height / 3,
    210,
    12 * Math.sin(phase) + 1
  );
  canvasCtx.fillRect(
    canvas.width / 2 - 95,
    33 + canvas.height / 3,
    190,
    9 * Math.sin(phase) + 1
  );
  canvasCtx.fillRect(
    canvas.width / 2 - 80,
    60 + canvas.height / 3,
    157,
    5.5 * Math.sin(phase) + 1
  );
  canvasCtx.fillRect(
    canvas.width / 2 - 50,
    80 + canvas.height / 3,
    100,
    3 * Math.sin(phase) + 1
  );
  if (phase < Math.PI / 2) {
    phase += 0.006;
  }
}
