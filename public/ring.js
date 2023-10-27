//Created by kusakari
//https://twitter.com/kusakarism

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setObject();
}

let _minW;
let _maxW;
let _palette0 = ["af3e4d", "2e86ab", "758e4f", "002a32", "f6ae2d", "fac9b8"];
let _count;
let _aryRing = [];
let _aryRotate = [];

function setObject() {
  _count = 0;
  _minW = min(width, height) * 1;
  _maxW = max(width, height);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  noFill();
  stroke(0, 60, 90);
  strokeWeight((_minW / 600) * pixelDensity()); //600 * pixelDensity());

  let numRing = 450;
  let posR = _minW / 2.9; //3.1;//3.5;
  let posAngNoiseInit_0 = [random(10000), random(10000), random(10000)];
  let rNoiseInit_0 = [random(10000), random(10000), random(10000)];
  let posRNoiseInit_0 = [random(10000), random(10000), random(10000)];
  let posAngNoiseThetaInit = random(2 * PI);
  let rNoiseThetaInit = random(2 * PI);
  let posRNoiseThetaInit = random(2 * PI);
  let posAngNoiseStep = 0.15;
  let rNoiseStep = 0.3; //0.2;
  let posRNoiseStep = 0.3; //0.2;
  let posAngNoiseSpeed = 0.004 * random([-1, 1]);
  let rNoiseSpeed = 0.004 * random([-1, 1]);
  let posRNoiseSpeed = 0.004 * random([-1, 1]);
  shuffle(_palette0, true);
  _aryRing = [];
  for (let i = 0; i < numRing; i++) {
    let posAngInit = ((2 * PI) / numRing) * i;
    let posAngNoiseInit = [
      posAngNoiseInit_0[0] + posAngNoiseStep * cos(posAngInit),
      posAngNoiseInit_0[1] + posAngNoiseStep * sin(posAngInit),
      posAngNoiseInit_0[2],
    ];
    let rNoiseInit = [
      rNoiseInit_0[0] + rNoiseStep * cos(posAngInit),
      rNoiseInit_0[1] + rNoiseStep * sin(posAngInit),
      rNoiseInit_0[2],
    ];
    let posRNoiseInit = [
      posRNoiseInit_0[0] + posRNoiseStep * cos(posAngInit),
      posRNoiseInit_0[1] + posRNoiseStep * sin(posAngInit),
      posRNoiseInit_0[2],
    ];

    _aryRing[i] = new Ring(
      posR,
      posAngInit,
      posAngNoiseInit,
      posAngNoiseThetaInit,
      posAngNoiseSpeed,
      rNoiseInit,
      rNoiseThetaInit,
      rNoiseSpeed,
      posRNoiseInit,
      posRNoiseThetaInit,
      posRNoiseSpeed,
      _palette0
    );
  }

  _aryRotate = [
    [random(2 * PI), random(0.01)],
    [random(2 * PI), random(0.01)],
    [random(2 * PI), random(0.01)],
  ];
}

class Ring {
  constructor(
    posR,
    posAngInit,
    posAngNoiseInit,
    posAngNoiseThetaInit,
    posAngNoiseSpeed,
    rNoiseInit,
    rNoiseThetaInit,
    rNoiseSpeed,
    posRNoiseInit,
    posRNoiseThetaInit,
    posRNoiseSpeed,
    palette
  ) {
    this.posR = posR;
    this.posAngInit = posAngInit;
    this.posAngNoiseInit = posAngNoiseInit;
    this.posAngNoiseThetaInit = posAngNoiseThetaInit;
    this.rNoiseInit = rNoiseInit;
    this.rNoiseThetaInit = rNoiseThetaInit;
    this.posRNoiseInit = posRNoiseInit;
    this.posRNoiseThetaInit = posRNoiseThetaInit;

    this.posAngNoiseSpeed = posAngNoiseSpeed;
    this.posAngMax = (2 * PI) / 8 / 1.65;
    this.posAngMin = -this.posAngMax;
    this.posAngGap = this.posAngMax - this.posAngMin;
    this.posAngNoiseFreq = 4;

    this.rNoiseSpeed = rNoiseSpeed;
    this.rMax = this.posR / 2;
    this.rMin = this.rMax / 10;
    this.rGap = this.rMax - this.rMin;
    this.rNoiseFreq = 4;

    this.posRNoiseSpeed = posRNoiseSpeed;
    this.posRMax = this.posR;
    this.posRMin = this.posRMax * 0.75; //0.5;
    this.posRGap = this.posRMax - this.posRMin;
    this.posRNoiseFreq = 4;

    this.colNoiseFreq = 3;

    this.rotZ = random(2 * PI);

    this.palette = palette;
    this.aryCol = [];
    for (let i = 0; i < this.palette.length; i++) {
      this.aryCol[i] = color("#" + this.palette[i]);
    }

    this.numCol = 5;

    this.count = 0;
  }

  draw() {
    let posAngNoiseVal =
      sin(
        this.posAngNoiseThetaInit +
          2 *
            PI *
            this.posAngNoiseFreq *
            noise(
              this.posAngNoiseInit[0],
              this.posAngNoiseInit[1] + this.posAngNoiseSpeed * this.count,
              this.posAngNoiseInit[2] + this.posAngNoiseSpeed * this.count
            )
      ) *
        0.5 +
      0.5;
    let posAng =
      this.posAngInit + this.posAngMin + this.posAngGap * posAngNoiseVal;

    let rNoiseVal =
      sin(
        this.rNoiseThetaInit +
          2 *
            PI *
            this.rNoiseFreq *
            noise(
              this.rNoiseInit[0],
              this.rNoiseInit[1] + this.rNoiseSpeed * this.count,
              this.rNoiseInit[2] + this.rNoiseSpeed * this.count
            )
      ) *
        0.5 +
      0.5;
    let r = this.rMin + this.rGap * rNoiseVal;

    let posRNoiseVal =
      sin(
        this.posRNoiseThetaInit +
          2 *
            PI *
            this.posRNoiseFreq *
            noise(
              this.posRNoiseInit[0],
              this.posRNoiseInit[1] + this.posRNoiseSpeed * this.count,
              this.posRNoiseInit[2] + this.posRNoiseSpeed * this.count
            )
      ) *
        0.5 +
      0.5;
    let posRNew = this.posRMin + this.posRGap * posRNoiseVal;

    let colNoiseVal =
      sin(
        this.posRNoiseThetaInit +
          2 *
            PI *
            this.colNoiseFreq *
            noise(
              this.posRNoiseInit[0] + 1000,
              this.posRNoiseInit[1] + this.posRNoiseSpeed * this.count + 1000,
              this.posRNoiseInit[2] + this.posRNoiseSpeed * this.count
            ) +
          1000
      ) *
        0.5 +
      0.5;
    let col_i1 = int(colNoiseVal * this.numCol);
    let col_i2 = (col_i1 + 1) % this.numCol;
    let colAmp = (colNoiseVal - col_i1 / this.numCol) * this.numCol;
    let col = lerpColor(this.aryCol[col_i1], this.aryCol[col_i2], colAmp);

    push();
    stroke(col);
    rotateX(PI / 2);
    rotateY(posAng);
    translate(posRNew, 0, 0);
    rotateZ(this.rotZ);
    ellipse(0, 0, r, r, 36);
    pop();

    this.count++;
  }
}

function draw() {
  ortho(-width / 2, width / 2, -height / 2, height / 2, -_maxW * 2, _maxW * 4);
  background((90 / 100) * 255);

  rotateX(_aryRotate[0][0] + _aryRotate[0][1] * frameCount);
  rotateY(_aryRotate[1][0] + _aryRotate[1][1] * frameCount);
  rotateZ(_aryRotate[2][0] + _aryRotate[2][1] * frameCount);

  rotateX(PI / 4);

  for (let i = 0; i < _aryRing.length; i++) {
    _aryRing[i].draw();
  }
}

window.onresize = function () {
  // assigns new values for width and height variables
  resizeCanvas(window.innerWidth, window.innerHeight);
};
