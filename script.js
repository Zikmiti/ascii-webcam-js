const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function desaturate(rgba) {

  for (var i = 0; i < rgba.length; i = i + 4) {
   
    let gray = 0.3 * rgba[i] + 0.59 * rgba[i + 1] + 0.11 * rgba[i + 2];

    gray += 255 - rgba[i + 3];
    rgba[i] = gray;
    rgba[i + 1] = gray;
    rgba[i + 2] = gray;
    rgba[i + 3] = 255;
  }
}

function ascii(grays, rows, cols) {
  let str = "";
  const palette = " .:-=+*#%@".split("").reverse();
  //const palette = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~i!lI;:,"^`. ';
  const paletteLength = palette.length;
  const range = 255 / paletteLength;

  for (let i = 0; i < grays.length; i++) {
    if (i !== 0 && i % cols === 0) {
      str += "\n";
    }
    let gray = grays[i];
    let char = Math.floor(gray / range);
    char = Math.min(char, paletteLength - 1);
    str += palette[char];

    // Sample every other row to account for font aspect ratio, where each char
    // is twice as tall as it is wide
    if (i !== 0 && i % cols === 0) {
      i += cols;
    }
  }
  text.innerHTML = str;
}



 function printAscii(image) {

   let img =  image;
    canvas.width = img.width;
    canvas.height = img.height;


  context.drawImage(img, 0, 0);
  let imgData = context.getImageData(0, 0, img.width, img.height);
  let rgba = imgData.data;

  desaturate(rgba);

  const grays = rgba.filter((color, index) => index % 4 === 0);

  ascii(grays, img.height, img.width);

  context.putImageData(imgData, 0, 0);
}

