// variables
let song, obj_width, obj_height, obj_speed, key, fps,
  img_sky, img_star, img_cloud, img_building, img_person, img_lamp, img_pole, img_frame, img_filter;

let img_signage = [];
let timestamp;

// array of objects 
let stars = [];
let clouds = [];
let buildings = [];
let lamps = [];
let poles = [];
let signages = [];
let train;
let backgrounds;
let melly;

function preload() {
  song = loadSound('audio/Yerin Baek - La La La Love Song.mp3');
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  key = 1;
  fps = 5;

  // image lists
  img_sky = loadImage('pixelart/background.png');
  img_star = loadImage('pixelart/star.png');
  img_cloud = loadImage('pixelart/cloud.png');
  img_building = loadImage('pixelart/building.png');
  img_person = loadImage('pixelart/avatar_mel.png');
  img_lamp = loadImage('pixelart/lamp.png');
  img_pole = loadImage('pixelart/pole.png');
  img_frame = loadImage('pixelart/subway_frame.png');
  img_filter = loadImage('pixelart/filter.png');

  for (let i = 0; i < 35; i++) {
    img_signage[i] = loadImage('pixelart/' + i + '.png');
  }

  // create objects
  for (let i = 0; i < 40; i++) {
    stars.push(new Star(width * (i + 1) * random(0.3, 0.7), height * 0.3 * (i + 1) * random(0.3, 0.7), 18, 18, 0.01));
    clouds.push(new Dirt(img_cloud, width * (i + 1), height * random(0.1, 0.3), 600, 200, 2));
    buildings.push(new Dirt(img_building, width * (i + 3) * 2, 0, width * 0.8, height * 0.9, 3));
    lamps.push(new Dirt(img_lamp, width * (i + 2) * 1.5, height * 0.2, width * 0.35, height, 6));
    poles.push(new Dirt(img_pole, width * (i + 1), -120, width * 0.8, height * 1.5, 6));
  }

  for (let i = 0; i < img_signage.length; i++) {
    signages.push(new Dirt(img_signage[i], width * (i + 10) * 1.05, height * 0.5, width * 0.25, height * 0.5, 6));
  }

  train = new Train();
  backgrounds = new Background();
  melly = new Person(img_person, width * 70, height * 0.4, width * 0.4, height * 0.5, 6);
}

function draw() {
  backgrounds.display();

  if (song.isPlaying()) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].shine();
      stars[i].display();
    }

    for (let i = 0; i < clouds.length; i++) {
      clouds[i].move();
      clouds[i].display();
    }

    for (let i = 0; i < buildings.length; i++) {
      buildings[i].move();
      buildings[i].display();
    }

    for (let i = 0; i < lamps.length; i++) {
      lamps[i].move();
      lamps[i].display();
    }

    for (let i = 0; i < signages.length; i++) {
      signages[i].move();
      signages[i].display();
    }

    for (let i = 0; i < poles.length; i++) {
      poles[i].move();
      poles[i].display();
    }

    melly.move();
    melly.display();
  }

  train.shake();
  train.shade();
  train.display();
}

// play the song
function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause();
  } else {
    song.play();
    timestamp = 0;
  }
}

// Star class
class Star {
  constructor(x, y, obj_width, obj_height, obj_speed) {
    this.obj_name = img_star;
    this.x = x;
    this.y = y;
    this.obj_width = obj_width;
    this.obj_height = obj_height;
    this.obj_speed = obj_speed;
  }

  shine() {
    this.x -= this.obj_speed;
  }

  display() {
    image(this.obj_name, this.x, this.y, this.obj_width, this.obj_height);
  }
}

// Dirt class
class Dirt {
  constructor(obj_name, x, y, obj_width, obj_height, obj_speed) {
    this.obj_name = obj_name;
    this.x = x;
    this.y = y;
    this.obj_width = obj_width;
    this.obj_height = obj_height;
    this.obj_speed = obj_speed;
  }

  move() {
    this.x -= this.obj_speed;
  }

  display() {
    image(this.obj_name, this.x, this.y, this.obj_width, this.obj_height);
  }
}

// Train class
class Train {
  constructor() {
    this.obj_name = img_frame;
    this.x = 0;
    this.y = -70;
    this.obj_width = width;
    this.obj_height = height * 1.3;
    this.grayshade = 0;
  }

  shake() {
    this.y += noise(0.5) * key;

    if (this.y > -65 || this.y < -75) {
      key *= -1;
    }
  }

  shade() {
    if (millis() - timestamp > 252000 && millis() - timestamp < 260000) {
      this.grayshade++;
    }
    else if (millis() - timestamp > 260000) {
      this.grayshade--;
    }
  }

  display() {
    image(this.obj_name, this.x, this.y, this.obj_width, this.obj_height);
    image(img_filter, 0, 0, width, height);

    noStroke();
    fill(0, this.grayshade);
    rect(0, 0, width, height);
  }
}

// Person class
class Person {
  constructor(obj_name, x, y, obj_width, obj_height, obj_speed) {
    this.obj_name = obj_name;
    this.x = x;
    this.y = y;
    this.obj_width = obj_width;
    this.obj_height = obj_height;
    this.obj_speed = obj_speed;
  }

  move() {
    if (this.x > width * 0.365)
      this.x -= this.obj_speed;
  }

  display() {
    image(this.obj_name, this.x, this.y, this.obj_width, this.obj_height);
  }
}

// Background class
class Background {
  constructor() {
    this.obj_name = img_sky;
  }

  display() {
    image(img_sky, 0, 0);
    noStroke();
    fill('gray');
    rect(0, height * 0.88, width, height * 0.1);
  }
}

