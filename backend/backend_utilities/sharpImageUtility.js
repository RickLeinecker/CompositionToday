const sharp = require("sharp");
const fs = require("fs");

function simpleExample() {
  var options = {
    width: 256,
    height: 256,
    fit: "cover",
    position: sharp.strategy.entropy,
  };
  var path = "/Users/brianmoon/Downloads/pexels-wendy-wei-1190297-2.jpg";
  var filename = "edm";

  sharp(path)
    .resize(options)
    .jpeg()
    .toFile("/Users/brianmoon/Desktop/" + filename);
}

simpleExample();
