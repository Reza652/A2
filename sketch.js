let r1 = 100;
let r2 = 125;
let mass1 = 10;
let mass2 = 10;
let angle1 = 0;
let angle2 = 0;
let angle1_velocity = 0;
let angle2_velocity = 0;
let gravity= 2;
const friction = 0.0002;

let pixelx2 = -1;
let pixely2 = -1;
let cx, cy;

let buffer;

function generateRandomNumber(min , max) 
{
    return Math.random() * (max-min) + min ;
}




function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  angle1 = PI / 2;
  angle2 = PI / 2;
  cx = width / 2;
  cy = 50;
  buffer = createGraphics(width, height);
  buffer.background(175);
  buffer.translate(cx, cy);
}

function draw() {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  let num1 = -gravity * (2 * mass1 + mass2) * sin(angle1);
  let num2 = -mass2 * gravity * sin(angle1 - 2 * angle2);
  let num3 = -2 * sin(angle1 - angle2) * mass2;
  let num4 = angle2_velocity * angle2_velocity * r2 + angle1_velocity * angle1_velocity * r1 * cos(angle1 - angle2);
  let den = r1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angle1_acc = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(angle1 - angle2);
  num2 = (angle1_velocity * angle1_velocity * r1 * (mass1 + mass2));
  num3 = gravity * (mass1 + mass2) * cos(angle1);
  num4 = angle2_velocity * angle2_velocity * r2 * mass2 * cos(angle1 - angle2);
  den = r2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angle2_acc = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = r1 * sin(angle1);
  let y1 = r1 * cos(angle1);

  let x2 = x1 + r2 * sin(angle2);
  let y2 = y1 + r2 * cos(angle2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, mass1, mass1);

  line(x1, y1, x2, y2);
  fill(generateRandomNumber(0 , 255) );
  ellipse(x2, y2, mass2, mass2);

  //angle1_acc = angle1_acc * friction;
  //angle2_acc = angle2_acc * friction;

  angle1_velocity += angle1_acc;
  angle2_velocity += angle2_acc;
  angle1 += angle1_velocity;
  angle2 += angle2_velocity;



  buffer.stroke(generateRandomNumber(0 , 255),generateRandomNumber(0 , 255),generateRandomNumber(0 , 255));
  if (frameCount > 1) {
    buffer.line(pixelx2, pixely2, x2, y2);
  }

  pixelx2 = x2;
  pixely2 = y2;
}