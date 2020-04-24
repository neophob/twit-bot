//https://jsfiddle.net/mypecf46/21/

const NAME_PREFIX = [
  'Monte', 'Piz', 'Mont', 'Pizzo', 'Grand', 'Dent de', 'Mount', 'Meru', 'Mera',
  'Nanga', 'King', 'Pico',
]

const NAME_POSTFIX = [
  'Rosa', 'Zupo', 'Roseg', 'Wannenhorn', 'Bernina', 'Combin', 'de Zinal', 'Dolent',
  'Velan', 'Singla', 'Glüschaint', 'Brule', 'Gele', 'Leone', 'Corvatsch',
  'Bottarello', 'Kesch', 'Linard', 'Platta', 'Julier', 'Fora', 'Ela', 'Fort',
  'Paradisin', 'Buin', 'Filana', 'Üertsch', 'Forbesch', 'Languard', 'Schärhorn',
  'Tschütta', 'Ot', 'Terrarossa', 'Bacun', 'Vadret', 'Medel', 'Timun', 'Cambrialas',
  'Sesvenna', 'Vadret', 'Rotondo', 'Surlek', 'Tasna', 'Pisoc', 'Vial', 'Tavrü',
  'Albris', 'Lagrev', 'Mitgel', 'Prüna', 'Terri', 'Mundin', 'Duan', 'Nuna',
  'Aul', 'Segnas', 'San Salvatore', 'Pèlerin', 'San Giorgio', 'Raimeux', 'de Vaulion',
  'Generoso', 'de Corjon', 'Rothorn', 'Everest', 'Kailash', 'Parbat', 'Peak', 'Pissis',
  'Pandim', 'Logan', 'Kilimanjaro', 'Elbrus', 'Damavand', 'Saint Elias', 'Pomiu',
  'Foraker', 'Lucania', 'Haramukh', 'Ararat', 'Steele', 'Stanley', 'Kazbek',
  'Sanford', 'Wood', 'Churchill', 'Slaggard', 'El Toro', 'Rainier', 'Whitney',
  'Rutford', 'Elbert', 'Princeton', 'Bross', 'Elgon', 'Sill', 'Oxford', 'Belford',
  'Shavano', 'Antero', 'Eolus', 'Adishi', 'Bierstadt', 'Muir', 'Scerscen', 'Morteratsch',
  'Badile', 'Centrale', 'di Claro', 'Molare', 'Carbonara', 'Kirigamine', 'Ventoux',
  'Veleta', 'Duarte', 'da Neblina', 'do Fogo', 'Almanzor', 'Turquino', 'Ruivo',
  'das Torres', 'Bolívar',
];

function getName() {
  return NAME_PREFIX[getRandomInt(NAME_PREFIX.length)] +
    ' ' +
    NAME_POSTFIX[getRandomInt(NAME_POSTFIX.length)];
}


function renderBridgeText(_x, _y, name) {
	_y -= 00;
//  _x -= 50;
  let i = 300;
  let os = document.createElement('canvas');
  os.width = 300;
  os.height = 200;
  let octx = os.getContext('2d');
  octx.clearRect(0, 0, 300, 200);
	octx.textBaseline = 'top';
	octx.textAlign = 'center';
  octx.font = "32px impact";
  octx.fillStyle = 'black';
//  context.fillText(name.toUpperCase(),50 + _x, _y - 150);
  octx.fillText(name.toUpperCase(), 150, 0);

  // slide and dice
  let dltY = 110 / 64;
  let y = 0;
  let angleSteps = 180 / i;
  while (i--) {
    y = 200 - 110 * Math.sin(i * angleSteps * Math.PI / 180);
    context.drawImage(os,
    	i, 0, 1, 64,
      i + _x, 30, 1, y
    );
   //ctx.drawImage(os,
     //i, 0, 1, textHeight,
     //i, h * 0.5 - offsetY / textHeight * y, 1, y);

//  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

  }
}


function getFillPattern() {
  const patternCanvas = document.createElement('canvas');
  const patternContext = patternCanvas.getContext('2d');

	const WIDTH = 600
	const HEIGHT = 10 + getRandomInt(6);
  patternCanvas.width = WIDTH;
  patternCanvas.height = HEIGHT;
  patternContext.strokeStyle = 'black';
  patternContext.lineWidth = 4;
  patternContext.moveTo(0, 0);
  patternContext.lineTo(WIDTH, HEIGHT);
  patternContext.stroke();

  // Create our primary canvas and fill it with the pattern
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const pattern = ctx.createPattern(patternCanvas, 'repeat');
	return pattern;
}

function getRandomInt(dimension) {
  return parseInt(Math.random() * dimension, 10);
}

function getNextMountainSegment(dimension, SEGMENTS) {
	return 2 * getRandomInt(dimension / SEGMENTS) - getRandomInt(dimension / SEGMENTS);
}

function buildMountainModel(dimension) {
 	const outerShellPoints = [];
 	const middlePoints = [];
  const shadowPoints = [];

  const SEGMENTS = 3 + getRandomInt(8);
  let ydest = 0;
  let xdest = 0;
  let graceSize = dimension / SEGMENTS / 2;
  let shadowRegion = new Path2D();
  const reversePath = [];
  const mountainRightSegmentLength = [];
  let flatout = false;

  //mountain up
  for (let n = 0; n < SEGMENTS; n++) {
    const yFract = graceSize + getNextMountainSegment(dimension, SEGMENTS);
    ydest -= yFract;
    xdest += dimension / SEGMENTS;
    outerShellPoints.push({ y: ydest, x: xdest });
  }

//mountain down
  let xdestMiddle = xdest;
  let ydestMiddle = ydest;
  shadowPoints.push({ x: xdestMiddle, y: ydestMiddle });
  for (let n = 0; n < SEGMENTS; n++) {
    const ypos = graceSize + getNextMountainSegment(dimension, SEGMENTS);
    ydest += ypos;
    if (ydest > 0) {
	    flatout = true;
    }
    xdest += dimension / SEGMENTS;
    mountainRightSegmentLength.push(ypos);
    outerShellPoints.push({ y: ydest, x: xdest });
    shadowPoints.push({ x: xdest, y: ydest });
  }

  //mountain middle
  middlePoints.push({ y: ydestMiddle, x: xdestMiddle });
  ydestMiddle += graceSize;
  const foo = [];
  for (let n = 0; n < SEGMENTS; n++) {
    xdestMiddle += getRandomInt(dimension / SEGMENTS);
    ydestMiddle += mountainRightSegmentLength[n];
    if (ydestMiddle > 0) ydestMiddle = 0;
		context.lineTo(xdestMiddle, ydestMiddle);
    middlePoints.push({ y: ydestMiddle, x: xdestMiddle });
    foo.push({ x: xdestMiddle, y: ydestMiddle });
  }

  while(foo.length) {
  	const entry = foo.pop();
  	shadowPoints.push(entry);
  }

  const yDiff = Math.abs(
  	Math.abs(outerShellPoints[0].y) - Math.abs(outerShellPoints[outerShellPoints.length - 1].y)
  );

  return {
	  outerShellPoints,
  	middlePoints,
    shadowPoints,
    good: flatout === false && yDiff < 3,
  }
}

function drawFir(x, y) {
  context.beginPath();
  context.lineWidth = 5;
  const length = 12 + getRandomInt(20);

  context.moveTo(x, y);
	context.lineTo(x, y - length);
	context.stroke();

  context.lineWidth = 3;

  let leafSize = 1 + getRandomInt(2);
  for (let n = length; n > 8; n -= 3) {
  	const sizeX = (leafSize++);
  	const sizeY = 2 + getRandomInt(2);

	  context.moveTo(x, y - n);
  	context.lineTo(x + sizeX, y - n + sizeY);
	  context.moveTo(x, y - n);
  	context.lineTo(x - sizeX, y - n + sizeY);
  }
	context.stroke();
}

function drawMountain(x, y, model) {
  context.beginPath();
  context.lineWidth = 8;
	context.moveTo(x, y);
  model.outerShellPoints.forEach((entry) => {
	  context.lineTo(x + entry.x, y + entry.y);
  });
	context.stroke();

  context.beginPath();
  context.lineWidth = 5;
  context.moveTo(x + model.middlePoints[0].x, y + model.middlePoints[0].y);
  model.middlePoints.forEach((entry) => {
	  context.lineTo(x + entry.x, y + entry.y);
  });
	context.stroke();

	let shadowRegion = new Path2D();
  let lastYPos = 0;
  shadowRegion.moveTo(x + model.shadowPoints[0].x, y + model.shadowPoints[0].y);
  while(model.shadowPoints.length) {
  	const entry = model.shadowPoints.pop();
  	shadowRegion.lineTo(x + entry.x, y + entry.y);
    lastYPos = entry.y;
  }
  shadowRegion.closePath();
  context.fillStyle = getFillPattern();
	context.fill(shadowRegion);

  context.lineWidth = 8;
  const x1 = x + 1;
  const y1 = y;
  const x2 = x + model.outerShellPoints[ model.outerShellPoints.length -1 ].x;
  const y2 = y + model.outerShellPoints[ model.outerShellPoints.length -1 ].y;

	context.beginPath();
	context.moveTo(x1, y1);
	context.bezierCurveTo(
  	x1 - 80, y1 - 0,
    x1 + getRandomInt(x2 - x1), y1 + getRandomInt(40),
    x2, y2 + 100
  );
	context.stroke();

  drawFir(x1 - 20, y1);
  drawFir(x2, y2 + 100);

  for (let n = 0; n < 6; n++) {
	  drawFir(x1 + getRandomInt(200), y1 + getRandomInt(60));
  }
  renderBridgeText(x, y, getName())
}

function getValidMountainModel(dimension) {
	do {
  	model = buildMountainModel(dimension);
  } while(model.good === false);
	return model;
}

var my_canvas = document.getElementById('canvas');
var context = my_canvas.getContext("2d");

context.strokeStyle = "black";
context.lineJoin = "round";
context.lineCap = "round";

setInterval(() => {
	context.clearRect(0, 0, canvas.width, canvas.height);
	const model1 = getValidMountainModel(175);
	drawMountain(80, 380, model);
/*	const model2 = getValidMountainModel(100);
	drawMountain(340, 160, model);
	const model3 = getValidMountainModel(100);
	drawMountain(40, 360, model);
	const model4 = getValidMountainModel(100);
	drawMountain(340, 360, model);
	const model5 = getValidMountainModel(100);
	drawMountain(40, 550, model);
	const model6 = getValidMountainModel(100);
	drawMountain(340, 550, model);/**/
}, 550)
