let mindelta = 65000;

let tolerance = 70;

let colorToDetect;

let video;
var arrGreen = [[]];
var arrRed = [[]];
var arrBlue = [[]];

//used this for understanding if it's the first time pressing
var prevState = false;
var prevStateRed = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  colorToDetect = color(0, 255, 0);
  
  video = createCapture(VIDEO);
  video.size(1830,1500);
  video.hide();
}


function draw() {
  image(video, 0, 0);
  let targetGreen = color(0, 255, 0);
  let targetRed = color(255, 0, 0);
  // let targetBlue = color(36, 50, 192);
  let firstGreen = findColor(targetGreen, video, colorToDetect, 200);
  let firstRed = findColor(targetRed, video, colorToDetect, 170);
  // let firstBlue = findColor(targetBlue, video, colorToDetect, 220);
  
  
  //CHECK IF GREEN COLOR IS DETECTED
  if(prevState == false && firstGreen !== undefined){
      var newArr = [];
      arrGreen.push(newArr);
      prevState = true;
      print("first green detected");
    }
  
  //CHECK IF GREEN IS RELEASED FOR THE FRIST TIME
  if(firstGreen == undefined && prevState == true){
    print("Green released");
    prevState = false;
  }
  
  //IF GREEN COLOR IS DETECTED SAVE LOCATION
  if(firstGreen !== undefined){
    arrGreen[arrGreen.length-1].push(createVector(firstGreen.x, firstGreen.y));
  }
  
  //DRAW LOCATION
  for(var i=0;i< arrGreen.length;i++){
    var trace = arrGreen[i];
    var prevPoint = undefined;
    for(var j = 0;j<trace.length;j++){
      var savedPoint = trace[j];
      // don't draw the first point
      if(prevPoint != undefined){
        stroke(255);
        strokeWeight(10);
        line(savedPoint.x,savedPoint.y, prevPoint.x,prevPoint.y);
      }
      prevPoint = savedPoint;
    }
  }
  
  //DELETE GREEN ARRAY IN A GREEN BOX
  if (firstGreen !== undefined && firstGreen.x <= 2000 && firstGreen.y <= 100) {
      arrGreen = [[]];
      prevStateGreen = false;
      firstGreen = undefined;
  }

  // if (firstGreen !== undefined){
  //   fill(targetGreen);
  //   circle(firstGreen.x, firstGreen.y, 30);
  //   arrGreen.push(firstGreen);
  //   if (arrGreen.length > 1) {
  //     stroke(255);
  //     strokeWeight(10);
  //     for (let i = 1; i < arrGreen.length; i++) {
  //       line(arrGreen[i-1].x, arrGreen[i-1].y, arrGreen[i].x, arrGreen[i].y);
  //     }
  //   }
  //   if (firstGreen.x >= 1730 && firstGreen.y <= 150) {
  //     arrGreen = [];
  //   }
  // }
  
  //CHECK IF RED COLOR IS DETECTED
  if(prevStateRed == false && firstRed !== undefined){
      var newArr = [];
      arrRed.push(newArr);
      prevStateRed = true;
      print("first red detected"); 
    }
  
  //CHECK IF RED IS RELEASED FOR THE FRIST TIME
  if(firstRed == undefined && prevStateRed == true){
    print("Red released");
    prevStateRed = false;
  }
  
  //IF RED COLOR IS DETECTED SAVE LOCATION
  if(firstRed !== undefined){
    arrRed[arrRed.length-1].push(createVector(firstRed.x, firstRed.y));
  }
  
  //DRAW LOCATION
  for(var i=0;i< arrRed.length;i++){
    var trace = arrRed[i];
    var prevPoint = undefined;
    for(var j = 0;j<trace.length;j++){
      var savedPoint = trace[j];
      // don't draw the first point
      if(prevPoint != undefined){
        stroke(255);
        strokeWeight(10);
        line(savedPoint.x,savedPoint.y, prevPoint.x,prevPoint.y);
      }
      prevPoint = savedPoint;
    }
  }

  //DELETE RED ARRAY IN A RED BOX
  if (firstRed !== undefined && firstRed.x <= 2000 && firstRed.y <= 100) {
      arrRed = [[]];
      prevStateRed = false;
      firstRed = undefined;
  }
  
  // if (firstRed !== undefined){
  //   fill(targetRed);
  //   circle(firstRed.x, firstRed.y, 30);
  //   arrRed.push(firstRed);
  //   if (arrRed.length > 1) {
  //     stroke(255);
  //     strokeWeight(10);
  //     for (let i = 1; i < arrRed.length; i++) {
  //       line(arrRed[i-1].x, arrRed[i-1].y, arrRed[i].x, arrRed[i].y);
  //     }
  //   }
  //   if (firstRed.x <= 150 && firstRed.y <= 150) {
  //     arrRed = [];
  //   }
  // }
  
  // if (firstBlue !== undefined){
  // fill(targetBlue);
  // circle(firstBlue.x, firstBlue.y, 30);
  //     arrBlue.push(firstBlue);
  //     if (arrBlue.length > 1) {
  //           stroke(255);
  //           strokeWeight(10);
  //           for (let i = 1; i < arrBlue.length; i++) {
  //             line(arrBlue[i-1].x, arrBlue[i-1].y, arrBlue[i].x, arrBlue[i].y);
  //           }
  //         }
  // }
  
  noStroke();
  fill(255);
  rect(0,1730,100,100);
  
  fill(255);
  rect(0,0,2000,100,);

}

// function mousePressed(){
//   loadPixels();
//   colorToDetect = get(mouseX, mouseY);
//   // colorToDetect = color(0, 255, 0);
// }


function findColor(target, input, c, threshold){
  
  if (input.width === 0 || input.height === 0) {
    return undefined;
  }
  let tr = red(target);
  let tg = green(target);
  let tb = blue(target);
  
  let detectR = red(c);
  let detectG = green(c);
  let detectB = blue(c);
  
  mindelta = 65000;
  input.loadPixels();
  var tempX,tempY;
  for (let y=0; y<input.height; y++){
    for (let x=0; x<input.width; x++){
      let index = (y * input.width + x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];
      
      let delta = abs(tr - r) + abs(tg - g) + abs(tb - b);
      
      if (mindelta > delta && delta < threshold){
        mindelta = delta;
        tempX= x;
          tempY= y;
        // if (r >= detectR-tolerance && r <= detectR+tolerance &&
        //     g >= detectG-tolerance && g <= detectG+tolerance &&
        //     b >= detectB-tolerance && b <= detectB+tolerance) {
      }
    }
  }
  if(tempX == undefined){
    return undefined;
  }
  return createVector(tempX, tempY);
  // return undefined;
}